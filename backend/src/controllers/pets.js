const express = require('express');
const router = express.Router();
const petService = require("../services/pets");
const auth = require("../middlewares/auth");
const {promisify} = require("util");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const unlinkAsync = promisify(fs.unlink);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/job_images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("File format should be PNG,JPG,JPEG"), false); // if validation failed then generate error
    }
};

const upload = multer({storage: storage, fileFilter: fileFilter});

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

router.post('/', [auth, upload.single('pet_image')], async (req, res) => {
    try {
        let pet = req.body;
        pet.owner = {id: req.user._id, firstName: req.user.firstName, lastName: req.user.lastName};
        const result = await petService.create(pet, req, req.file);
        res.status(result.status).send(result.data);
    } catch (e) {
        if (req.file) await unlinkAsync(req.file.path);
        res.status(500).send(e.message);
    }
});

router.put('/:id', [auth, upload.single('pet_image')], async (req, res) => {
    try {
        let pet = req.body;
        pet.owner = {id: req.user._id, firstName: req.user.firstName, lastName: req.user.lastName};
        const result = await petService.edit(req.params.id, pet, req, req.file);
        res.status(result.status).send(result.data);
    } catch (e) {
        if (req.file) await unlinkAsync(req.file.path);
        res.status(500).send(e.message);
    }
});

module.exports = router;