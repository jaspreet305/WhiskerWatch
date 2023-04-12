const ObjectId = require('mongoose').Types.ObjectId;
const {Pet} = require("../models/pet");
const {BadRequest, Success, NotFound, Created} = require("../utils/results");

const findAll = async () => {
    let pets = await Pet.find();
    return Success(pets);
};

const findAllUserPets = async (userId) => {
    let pets = await Pet.find({"owner.id": userId});
    return Success(pets);
}

const findOne = async (id) => {
    if (id !== new ObjectId(id).toString()) return BadRequest("Invalid Pet Id");
    let pet = await Pet.findById(id);
    if (!pet) return NotFound("Not found");
    return Success(pet);
};

const create = async (pet) => {
    pet.appointment = new Date();
    let p = await new Pet(pet);
    await p.save();
    return Created(p);
};

const edit = async (id, pet) => {
    if (!id) return BadRequest("Pet id not found");
    const p = await Pet.findByIdAndUpdate(id, pet, {new: true});
    if (!p) return NotFound("Error while updating the pet");
    return Success(p);
};

exports.findOne = findOne;
exports.findAll = findAll;
exports.findAllUserPets = findAllUserPets;
exports.create = create;
exports.edit = edit;