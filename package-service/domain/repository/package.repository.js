const mongoose = require('mongoose');
const {locationSchema} = require('pk-common-lib/repository/location.repository');

console.log(locationSchema);

const packageSchema = new mongoose.Schema({
    _id: false,
    package_id: {
        type: mongoose.schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        unique: true,
    },
    active_delivery: {
        type: mongoose.schema.Types.ObjectId,
        required: true
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
});

const PackageRepository = mongoose.model('Course', packageSchema);


module.exports = PackageRepository;