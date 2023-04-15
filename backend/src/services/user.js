const ObjectId = require('mongoose').Types.ObjectId;
const {User} = require("../models/user");
const {BadRequest, Success, NotFound, Created} = require("../utils/results");
var bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const {Appointment} = require("../models/appointment");
const {createAppointment} = require("./appointment");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const findOne = async (id) => {
    if (id !== new ObjectId(id).toString()) return BadRequest("Invalid User Id");
    let user = await User.findById(id).select('-password');
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
    let newAppointment = await createAppointment(appointment);
    return Success(newAppointment);
};


const getAppointmentsByUser = async (userId) => {
    if (!userId)
        return BadRequest("Invalid User Id");

    // Find all appointments that belong to the user
    const appointments = await Appointment.find({user: userId});

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