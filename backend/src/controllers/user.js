const express = require('express');
const router = express.Router();
const userService = require("../services/user");
const auth = require("../middlewares/auth");

router.get('/', async (req,res) => {
    try {
        const result = await userService.findAll();
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await userService.findOne(req.params.id);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/signup', async (req, res) => {
    try {
        let user = req.body;
        const result = await userService.create(user);
        res.status(result.status).send(result.data);
    } catch (e) {
        if (e.code === 11000) {
            res.status(409).send("Email already exists");
        } else {
            res.status(500).send(e.message);
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        let user = req.body;
        const result = await userService.login(user);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let user = req.body;
        const result = await userService.edit(req.params.id, user);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/request/:appointment', auth, async (req, res) => {
    try {
        const result = await userService.requestAppointment(req.params.appointment);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/appointments/:id', auth, async (req, res) => {
    try {
        const result = await userService.getAppointmentsByUser(req.params.id);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
