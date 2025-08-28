const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
first_name: String,
last_name: String,
password: String,
email: String,
});
module.exports = mongoose.model('UserProfile', UserSchema);