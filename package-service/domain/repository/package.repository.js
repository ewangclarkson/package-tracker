const mongoose = require('mongoose');
const {locationSchema} = require('pk-common-lib/repository/location.repository');


const packageSchema = new mongoose.Schema({
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
    },
    active_delivery_id: {
        type: mongoose.Schema.Types.ObjectId,
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
    form_name: {
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