const {BadRequest, NotFound, Created, Success} = require("../utils/results");
const {Appointment} = require("../models/appointment");
const sgMail = require('@sendgrid/mail');
const {User} = require("../models/user");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getAppointments = async (userId) => {
    const appointments = await Appointment.find({user: userId});
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

    return Success(deletedAppointment._id);
};

const editAppointment = async (appointmentId, appointment) => {
    if (!appointmentId)
        return BadRequest("Appointment id not found");

    const a = await Appointment.findByIdAndUpdate(appointmentId, appointment, {new: true});

    if (!a)
        return NotFound("Error while updating the appointment");

    return Success(a);
};

exports.getAppointments = getAppointments;
exports.createAppointment = createAppointment;
exports.cancelAppointment = cancelAppointment;
exports.editAppointment = editAppointment;
