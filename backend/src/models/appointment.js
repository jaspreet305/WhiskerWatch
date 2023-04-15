const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    providerId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['grooming', 'sitting', 'training'],
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

exports.Appointment = Appointment;
exports.appointmentSchema = appointmentSchema;