const mongoose = require('mongoose');
const Joi = require("joi");

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker'
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved'],
        default: 'Pending'
    },
    type: {
        type: String,
        enum: ['grooming', 'sitting', 'training'],
        required: true
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

function validateAppointment(Appointment) {
    const schema = Joi.object({
        user: Joi.string().required(),
        pet: Joi.string().required(),
        date: Joi.date().required(),
        type: Joi.string().required(),
    }).options({allowUnknown: true});
    return schema.validate(Appointment);
}

exports.Appointment = Appointment;
exports.appointmentSchema = appointmentSchema;
exports.validate = validateAppointment;