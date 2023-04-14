const {BadRequest, NotFound, Created, Success} = require("../utils/results");
const {Appointment} = require("../models/appointment");
const sgMail = require('@sendgrid/mail');
const {User} = require("../models/user");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getAppointments = async (userId) => {
    const appointments = await Appointment.find({user: userId}).populate('user');
    return Success(appointments);
}

const createAppointment = async (appointment) => {
    const user = await User.findById(appointment.user);
    if (!user) {
        return NotFound("User not found");
    }

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
    const appointmentDate = deletedAppointment.date.toDateString();
    const emailBody = `Your appointment for ${deletedAppointment.type} on ${appointmentDate} has been cancelled. We apologize for any inconvenience caused.`;
    const userMsg = {
        to: userEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Appointment Cancelled',
        text: emailBody,
        html: `<p>${emailBody}</p>`,
    };
    await sgMail.send(userMsg);

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
    const appointmentDate = a.date.toDateString();
    const emailBody = `Your appointment for ${a.type} has been rescheduled to ${appointmentDate}. Thank you for choosing our service!`;
    const userMsg = {
        to: userEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Appointment Rescheduled',
        text: emailBody,
        html: `<p>${emailBody}</p>`,
    };
    await sgMail.send(userMsg);

    return Success(a);
};

exports.getAppointments = getAppointments;
exports.createAppointment = createAppointment;
exports.cancelAppointment = cancelAppointment;
exports.editAppointment = editAppointment;
