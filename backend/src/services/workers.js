const ObjectId = require('mongoose').Types.ObjectId;
const {Worker, validate, validate_auth} = require("../models/workers");
const {BadRequest, Success, NotFound, Created} = require("../utils/results");
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
    const workers = await Worker.find().sort({ firstName: 'asc', lastName: 'asc' }).select("firstName lastName");
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

exports.findOne = findOne;
exports.create = create;
exports.login = login;
exports.edit = edit;
exports.deleteWorker = deleteWorker;
exports.findAll = findAll;