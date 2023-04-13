const express = require('express');
const router = express.Router();
const petService = require("../services/pet");
const auth = require("../middlewares/auth");


router.get('/', async (req, res) => {
    try {
        const result = await petService.findAll();
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
router.get('/users/:id', async (req, res) => {
    try {
        const result = await petService.findAllUserPets(req.params.id);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await petService.findOne(req.params.id);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        let pet = req.body;
        pet.owner = {id: req.user._id, firstName: req.user.firstName, lastName: req.user.lastName};
        const result = await petService.create(pet);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let pet = req.body;
        pet.owner = {id: req.user._id, firstName: req.user.firstName, lastName: req.user.lastName};
        const result = await petService.edit(req.params.id, pet);
        res.status(result.status).send(result.data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;