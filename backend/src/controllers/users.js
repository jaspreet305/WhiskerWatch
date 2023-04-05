const express = require('express');
const router = express.Router();
const userService = require("../services/users");
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

router.post('/request/:id', auth, async (req, res) => {
    try {
        const id1 = req.user._id;
        const id2 = req.params.id;
        const result = await userService.requestHandshake(id1, id2);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/approve/:id', auth, async (req, res) => {
    try {
        const id1 = req.user._id;
        const id2 = req.params.id;
        const result = await userService.approveHandshake(id1, id2);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/decline/:id', auth, async (req, res) => {
    try {
        const id1 = req.user._id;
        const id2 = req.params.id;
        const result = await userService.declineHandshake(id1, id2);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/cancel/:id', auth, async (req, res) => {
    try {
        const id1 = req.user._id;
        const id2 = req.params.id;
        const result = await userService.cancelRequest(id1, id2);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/remove/:id', auth, async (req, res) => {
    try {
        const id1 = req.user._id;
        const id2 = req.params.id;
        const result = await userService.removeHandshake(id1, id2);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/handshakes/:id', async (req, res) => {
    try {
        const result = await userService.findAllUserHandshakes(req.params.id);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
