const mongoose = require('mongoose');
const {locationSchema} = require('pk-common-lib/repository/location.repository');

const deliverySchema = new mongoose.Schema({
    delivery_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
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