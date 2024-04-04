const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    // Define your schema fields
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    }
},{id:false});

const locationRepository = mongoose.model('Location',locationSchema);
module.exports={
    locationSchema,
    locationRepository
}