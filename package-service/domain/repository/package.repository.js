const mongoose = require('mongoose');
const {locationSchema} = require('pk-common-lib/repository/location.repository');
const { v4: uuidv4 } = require('uuid');

const packageSchema = new mongoose.Schema({
    package_id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    active_delivery_id: {
        type: String
        //required: true
    },
    description: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
    },
    width: {
        type: Number, //cm
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    depth: {
        type: Number,
        required: true,
    },
    from_name: {
        type: String
    },
    from_address: {
        type: String
    },
    from_location: locationSchema,
    to_name: {
        type: String
    },
    to_address: {
        type: String
    },
    to_location: locationSchema
},{id: false,});

const PackageRepository = mongoose.model('Package', packageSchema);


module.exports = PackageRepository;