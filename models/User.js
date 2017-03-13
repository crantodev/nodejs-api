// Include dependencies
const mongoose = require('mongoose');
// Initialize the User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
// Set the model User
mongoose.model('User', UserSchema);
// Export model
module.exports = mongoose.model('User');