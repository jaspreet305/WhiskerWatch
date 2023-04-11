const ObjectId = require('mongoose').Types.ObjectId;
const {Worker, validate, validate_auth} = require("../models/worker");
const {BadRequest, Success, NotFound, Created} = require("../utils/results");
const {Appointment} = require("../models/appointment");
var bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const findOne = async (id) => {
    if (id !== new ObjectId(id).toString()) return BadRequest("Invalid Worker Id");
    let worker = await Worker.findById(id).select('firstName lastName avatar email addresses');
    if (!worker) return NotFound("Not found");
    return Success(worker);
}

const findAll = async () => {
    const workers = await Worker.find().sort({firstName: 'asc', lastName: 'asc'}).select("firstName lastName");
    return Success(workers);
};

const create = async (worker) => {
    if (validate(worker).error)
        return BadRequest("Invalid Worker");
    let u = await new Worker(worker);
    const salt = await bcrypt.genSalt(10);
    u.password = await bcrypt.hash(worker.password, salt);
    await u.save();
    const token = u.generateAuthToken();
    return Created(token);
}

const login = async (worker) => {
    if (validate_auth(worker).error)
        return BadRequest("Invalid Credentials");
    let u = await Worker.findOne({email: worker.email})
    if (!u)
        return NotFound("Worker with this email was not found");

    const validPassword = await bcrypt.compare(worker.password, u.password);
    if (!validPassword)
        return BadRequest("Invalid Credentials");

    const token = u.generateAuthToken();
    return Success(token);
}

const edit = async (id, worker) => {
    if (validate(worker).error)
        return BadRequest("Invalid Worker");

    if (!id)
        return BadRequest("Worker id not found");
    const u = await Worker.findByIdAndUpdate(id, worker, {new: true});

    if (!u)
        return NotFound("Error while updating the worker");

    return Success(u);
}

const deleteWorker = async (id) => {
    if (!id)
        return BadRequest("Worker id not found");

    let deletedWorker = await Worker.findByIdAndDelete(id);
    if (!deletedWorker)
        return BadRequest("Worker not found");

    return Success(deletedWorker._id);
}

const acceptAppointment = async (id) => {
    if (id !== new ObjectId(id).toString()) return BadRequest("Invalid Appointment Id");
    let appointment = await Appointment.findByIdAndUpdate(id, {status: "Accepted"}, {new: true}).populate("user", "firstName lastName avatar email");
    if (!appointment) return NotFound("Appointment not found");

    // Send email to user
    const userEmail = appointment.user.email;
    const petName = appointment.pet.name;
    const appointmentDate = appointment.date.toDateString();
    const emailBody = `Your appointment for ${appointment.type} on ${appointmentDate} for ${petName} has been scheduled. Thank you for choosing our service!`;
    const userMsg = {
        to: userEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Appointment Scheduled',
        text: emailBody,
        html: `<p>${emailBody}</p>`,
    };
    await sgMail.send(userMsg);

    // Send email to worker
    const workerEmail = appointment.worker.email;
    const workerBody = `You have a new appointment scheduled for ${appointment.type} on ${appointmentDate} with ${appointment.user.firstName} ${appointment.user.lastName}'s pet ${petName}.`;
    const workerMsg = {
        to: workerEmail,
        from: process.env.SENDGRID_EMAIL,
        subject: 'New Scheduled Appointment',
        text: workerBody,
        html: `<p>${workerBody}</p>`,
    };
    await sgMail.send(workerMsg);

    return Success(appointment);
}

const getAllAppointments = async (id) => {
    if (id !== new ObjectId(id).toString()) return BadRequest("Invalid Worker Id");
    const appointments = await Appointment.find({worker: id}).populate("user", "firstName lastName avatar email").sort({date: 'asc'});
    return Success(appointments);
};

exports.findOne = findOne;
exports.create = create;
exports.login = login;
exports.edit = edit;
exports.deleteWorker = deleteWorker;
exports.findAll = findAll;
exports.acceptAppointment = acceptAppointment;
exports.getAllAppointments = getAllAppointments;