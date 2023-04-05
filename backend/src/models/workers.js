const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    city: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["trainer", "sitter", "groomer"]
    },
    pets: [{
        petId: String
    }]
});

workerSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        avatar: this.avatar,
        city: this.city,
        role: this.role,
        pets: this.pets,
    }, process.env.JWT_PRIVATE_KEY);
}

const Workers = mongoose.model('Worker', workerSchema);

function validateWorker(worker) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }).options({allowUnknown: true});
    return schema.validate(worker);
}

function validate_auth(req) {
    const schema = Joi.object({
        email: Joi.string().min(2).max(255).required().email(),
        password: Joi.string().min(2).max(1024).required()
    })
    return schema.validate(req);
}

exports.Worker = Workers;
exports.workerSchema = workerSchema;
exports.validate = validateWorker;
exports.validate_auth = validate_auth;