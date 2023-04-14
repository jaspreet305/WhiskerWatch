const express = require('express');
const router = express.Router();
const appointmentService = require("../services/appointment");
const auth = require("../middlewares/auth");

router.get('/', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const result = await appointmentService.getAppointments(userId);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        let appointment = req.body;
        const result = await appointmentService.createAppointment(appointment);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await appointmentService.cancelAppointment(req.params.id);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let appointment = req.body;
        const result = await appointmentService.editAppointment(req.params.id, appointment.date);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
