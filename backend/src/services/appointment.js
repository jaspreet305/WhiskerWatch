const {Worker} = require("../models/worker");
const {BadRequest, NotFound, Created, Success} = require("../utils/results");
const {Appointment} = require("../models/appointment");
const sgMail = require('@sendgrid/mail');
const {User} = require("../models/user");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createAppointment = async (appointment) => {
    const user = await User.findById(appointment.user);
    if (!user) {
        return NotFound("User not found");
    }

    const worker = await Worker.findById(appointment.worker);
    if (!worker) {
        return NotFound("Worker not found");
    }

    // Check if the worker can accept the appointment based on its type
    if (
        (appointment.type === "training" && worker.type !== "trainer") ||
        (appointment.type === "grooming" && worker.type !== "groomer") ||
        (appointment.type === "sitting" && worker.type !== "sitter")
    ) return BadRequest("Invalid appointment type for this worker");


    let app = await new Appointment(appointment);
    await app.save();

    return Created(app);
};

const cancelAppointment = async (appointmentId) => {
    if (!appointmentId)
        return BadRequest("Appointment id not found");

    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment)
        return BadRequest("Appointment not found");

    // Send email to user
    const userEmail = deletedAppointment.user.email;
    const petName = deletedAppointment.pet.name;
    const appointmentDate = deletedAppointment.date.toDateString();
    const emailBody = `Your appointment for ${deletedAppointment.type} on ${appointmentDate} for ${petName} has been cancelled. We apologize for any inconvenience caused.`;
    const userMsg = {
        to: userEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Appointment Cancelled',
        text: emailBody,
        html: `<p>${emailBody}</p>`,
    };
    await sgMail.send(userMsg);

    // Send email to worker
    const workerEmail = deletedAppointment.worker.email;
    const workerBody = `The appointment scheduled for ${deletedAppointment.type} on ${appointmentDate} with ${deletedAppointment.user.firstName} ${deletedAppointment.user.lastName}'s pet ${petName} has been cancelled.`;
    const workerMsg = {
        to: workerEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Appointment Cancelled',
        text: workerBody,
        html: `<p>${workerBody}</p>`,
    };
    await sgMail.send(workerMsg);

    return Success(deletedAppointment._id);
};

const editAppointment = async (appointmentId, date) => {
    if (!appointmentId)
        return BadRequest("Appointment id not found");

    let a = await Appointment.findById(appointmentId);
    a.date = date;

    a = await Appointment.findById(appointmentId, a, {new: true});

    if (!a)
        return NotFound("Error while updating the appointment");

    // Send email to user
    const userEmail = a.user.email;
    const petName = a.pet.name;
    const appointmentDate = a.date.toDateString();
    const emailBody = `Your appointment for ${a.type} has been rescheduled to ${appointmentDate} for ${petName}. Thank you for choosing our service!`;
    const userMsg = {
        to: userEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Appointment Rescheduled',
        text: emailBody,
        html: `<p>${emailBody}</p>`,
    };
    await sgMail.send(userMsg);

    // Send email to worker
    const workerEmail = a.worker.email;
    const workerBody = `The appointment scheduled for ${a.type} on ${appointmentDate} with ${a.user.firstName} ${a.user.lastName}'s pet ${petName} has been rescheduled.`;
    const workerMsg = {
        to: workerEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Appointment Rescheduled',
        text: workerBody,
        html: `<p>${workerBody}</p>`,
    };
    await sgMail.send(workerMsg);

    return Success(a);
};

exports.createAppointment = createAppointment;
exports.cancelAppointment = cancelAppointment;
exports.editAppointment = editAppointment;
