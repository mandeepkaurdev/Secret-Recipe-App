const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var login = mongoose.model('login', loginSchema);

module.exports = login;