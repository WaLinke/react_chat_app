const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 255
    },
    password: {
        type: String, 
        required: true,
        minLength: 6,
        maxLength: 1024
    },
    socket_id: {
        type: String,
        maxLength: 1024,
        default: null,
    }
},{timestamps: true});
module.exports = mongoose.model('User',UserSchema,'users');