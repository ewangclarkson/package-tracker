const mongoose = require('mongoose');
const {locationSchema} = require('pk-common-lib/repository');

const deliverySchema = new mongoose.Schema({
    _id:false,
    delivery_id: {
        type: mongoose.schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        unique: true,
    },
    package_id: {
        type: mongoose.schema.Types.ObjectId,
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
});

const PackageRepository = mongoose.model('Course', deliverySchema);

module.exports = PackageRepository;