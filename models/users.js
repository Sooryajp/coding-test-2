const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
  firstName: mongoose.Schema.Types.String,
  lastName: mongoose.Schema.Types.String,
  age: mongoose.Schema.Types.Number,
  profession: mongoose.Schema.Types.String,
});

const users = mongoose.connection.useDb('users');
module.exports = users.model('users', UserSchema);
