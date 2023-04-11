const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const {petSchema} = require("./pet");

const userSchema = new mongoose.Schema({
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
        required: true
    },
    pets: [petSchema]
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        avatar: this.avatar,
        city: this.city,
        pets: this.pets,
    }, process.env.JWT_PRIVATE_KEY);
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }).options({allowUnknown: true});
    return schema.validate(user);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;