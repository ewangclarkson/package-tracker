const mongoose = require('mongoose');
;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String, //cm
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength:9,
        unique: true
    },
    roles: {
        type: [String],
        enum: ['USER', 'DRIVER', 'ADMIN'],
    }
});

const UserRepository = mongoose.model('User', userSchema);


module.exports = UserRepository;