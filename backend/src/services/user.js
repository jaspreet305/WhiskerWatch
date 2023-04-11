const ObjectId = require('mongoose').Types.ObjectId;
const {User} = require("../models/user");
const {BadRequest, Success, NotFound, Created} = require("../utils/results");
var bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const {Appointment} = require("../models/appointment");
const {Pet} = require("../models/pet");
const {createAppointment} = require("./appointment");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const findOne = async (id) => {
    if (id !== new ObjectId(id).toString()) return BadRequest("Invalid User Id");
    let user = await User.findById(id).select('firstName lastName avatar email addresses');
    if (!user) return NotFound("Not found");
    return Success(user);
}

const findAll = async () => {
    const users = await User.find().sort({firstName: 'asc', lastName: 'asc'}).select("firstName lastName");
    return Success(users);
};

const create = async (user) => {
    let u = await new User(user);
    const salt = await bcrypt.genSalt(10);
    u.password = await bcrypt.hash(user.password, salt);
    await u.save();
    const token = u.generateAuthToken();
    return Created(token);
}

const login = async (user) => {
    let u = await User.findOne({email: user.email})
    if (!u)
        return NotFound("User with this email was not found");

    const validPassword = await bcrypt.compare(user.password, u.password);
    if (!validPassword)
        return BadRequest("Invalid Credentials");

    const token = u.generateAuthToken();
    return Success(token);
}

const edit = async (id, user) => {
    if (!id)
        return BadRequest("User id not found");
    const u = await User.findByIdAndUpdate(id, user, {new: true});

    if (!u)
        return NotFound("Error while updating the user");

    return Success(u);
}

const deleteUser = async (id) => {
    if (!id)
        return BadRequest("User id not found");

    let deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
        return BadRequest("User not found");

    return Success(deletedUser._id);
}

const requestAppointment = async (appointment) => {
    // Check if pet exists and belongs to the user
    const pet = await Pet.findById(appointment.pet);
    if (!pet || pet.owner.id !== appointment.user)
        return BadRequest("Invalid Pet");

    // Check if the requested date has already passed
    if (appointment.date < new Date())
        return BadRequest("Requested date has already passed");

    // Check if worker exists and can handle the requested appointment type
    const worker = await Worker.findById(appointment.worker);
    if (!worker)
        return BadRequest("Invalid Worker");

    // Create new appointment with Pending status
    let newAppointment = await createAppointment(appointment);
    newAppointment.status = 'Pending';
    newAppointment = await Appointment.findByIdAndUpdate(appointment.__id, newAppointment, {new: true});

    // Send email to the worker
    const workerEmail = worker.email;
    const petName = pet.name;
    const appointmentDate = appointment.date.toDateString();
    const emailBody = `You have a new appointment request for ${appointment.type} on ${appointmentDate} for ${petName}. Please check your schedule and respond within 24 hours.`;
    const msg = {
        to: workerEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: 'New Appointment Request',
        text: emailBody,
        html: `<p>${emailBody}</p>`,
    };
    await sgMail.send(msg);

    return Success(newAppointment);
};


const getAppointmentsByUser = async (userId) => {
    if (!userId)
        return BadRequest("Invalid User Id");

    // Find all appointments that belong to the user
    const appointments = await Appointment.find({user: userId}).populate('pet').populate('worker');

    if (appointments.length === 0)
        return NotFound("No Appointments Found");

    return Success(appointments);
}

exports.findOne = findOne;
exports.create = create;
exports.login = login;
exports.edit = edit;
exports.deleteUser = deleteUser;
exports.findAll = findAll;
exports.requestAppointment = requestAppointment;
exports.getAppointmentsByUser = getAppointmentsByUser;