const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    providerId: {
        type: String,
    },
    date: {
        type: Date,
    },
    type: {
        type: String,
        enum: ['grooming', 'sitting', 'training'],
    },
    time: {
        type: String,
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

exports.Appointment = Appointment;
exports.appointmentSchema = appointmentSchema;