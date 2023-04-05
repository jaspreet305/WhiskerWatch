const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    owner: {
        firstName: String,
        lastName: String,
        id: String
    },
    image: {
        type: String,
    },
    appointment: {
        type: Date
    },
    petType: {
        type: String,
        enum: ["cat", "dog"]
    }
});

const Pets = mongoose.model("Pets", petSchema);

function validatePet(Pet) {
}

exports.Pet = Pets;
exports.petSchema = petSchema;
exports.validate = validatePet;