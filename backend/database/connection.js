const mongoose = require("mongoose");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

module.exports = {
    connectToServer: function () {
        mongoose.connect(
            process.env.ATLAS_URI,
            options
        ).then(() => console.info('Connected to MongoDB'))
            .catch((err) => console.error('Could not connect to MongoDB...', err));
    }
};