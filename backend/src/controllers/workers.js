const express = require('express');
const router = express.Router();
const workerService = require("../services/workers");
const auth = require("../middlewares/auth");

router.get('/', async (req,res) => {
    try {
        const result = await workerService.findAll();
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await workerService.findOne(req.params.id);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/signup', async (req, res) => {
    try {
        let worker = req.body;
        const result = await workerService.create(worker);
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
        let worker = req.body;
        const result = await workerService.login(worker);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let worker = req.body;
        const result = await workerService.edit(req.params.id, worker);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
