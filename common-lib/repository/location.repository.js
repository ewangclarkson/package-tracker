const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    // Define your schema fields
    field1: {
        type: String,
        required: true,
    },
    field2: {
        type: Number,
        required: true,
    },
});

const LocationRepository = mongoose.model('Location',locationSchema);
module.exports={
    locationSchema,
    LocationRepository
}