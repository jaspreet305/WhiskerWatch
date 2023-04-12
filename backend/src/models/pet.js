const mongoose = require("mongoose");
const {appointmentSchema} = require("./appointment");

const petSchema = new mongoose.Schema({
    owner: {
        firstName: String,
        lastName: String,
        email: String,
        id: String,
    },
    name: {
        type: String,
    },
    petType: {
        type: String,
        enum: ["cat", "dog"],
    },
    breed: {
        type: String
    },
    age: {
        type: String
    },
    health: {
        type: String,
        enum: ["fit", "healthy", "sick", "injured"]
    },
    sex: {
        type: String,
        enum: ["male", "female"]
    },
    location: {
        type: String
    },
    details: {
        type: String
    }
});

const Pet = mongoose.model("Pet", petSchema);

exports.Pet = Pet;
exports.petSchema = petSchema;
