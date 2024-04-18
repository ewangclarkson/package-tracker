const mongoose = require('mongoose');
const {locationSchema} = require('pk-common-lib/repository/location.repository');
const {v4: uuidv4} = require('uuid');

const deliverySchema = new mongoose.Schema({
    delivery_id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    package_id: {
        type: String,
        required: true
    },
    pickup_time: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date, //cm
        required: true,
    },
    location: locationSchema,
    status: {
        type: String,
        enum: ['open','picked-up','in-transit','delivered','failed'],
        required: true,
    },
},{ id: false,});

const PackageRepository = mongoose.model('Delivery', deliverySchema);

module.exports = PackageRepository;