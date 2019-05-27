const userSchema = require('../schemas/user');
const mongoose = require('mongoose');

module.exports = mongoose.model('user', userSchema);
