const {Worker, validate} = require("../models/worker");
const {BadRequest, NotFound, Created} = require("../utils/results");
const {Appointment, validate} = require("../models/appointment");
const sgMail = require('@sendgrid/mail');
const {User} = require("../models/user");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createAppointment = async (appointment) => {
    if (validate(appointment).error) {
        return BadRequest("Invalid Appointment");
    }

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
        (appointment.type === "grooming" && worker.type !== "groomer")||
        (appointment.type === "sitting" && worker.type !== "sitter")
    ) return BadRequest("Invalid appointment type for this worker");


    let app = await new Appointment(appointment);
    await app.save();

    // Send email to the user
    const msg = {
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: "Appointment request received",
        text: `Dear ${user.firstName}, Your appointment request has been received.`,
        html: `<p>Dear ${user.firstName},</p><p>Your appointment request has been received.</p>`,
    };
    await sgMail.send(msg);

    return Created(app);
};

exports.createAppointment = createAppointment;
