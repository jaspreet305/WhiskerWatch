const mongoose = require("mongoose");
const {appointmentSchema} = require("./appointment");
const Joi = require("joi");

const petSchema = new mongoose.Schema({
    owner: {
        firstName: String,
        lastName: String,
        id: String,
    },
    image: {
        type: String,
    },
    petType: {
        type: String,
        enum: ["cat", "dog"],
    },
    appointments: [appointmentSchema],
});

const Pet = mongoose.model("Pet", petSchema);

function validatePet(Pet) {
    const schema = Joi.object({
        owner: Joi.required(),
        petType: Joi.required(),
    }).options({allowUnknown: true});
    return schema.validate(Pet);
}

exports.Pet = Pet;
exports.petSchema = petSchema;
exports.validate = validatePet;
