const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

const queryLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  query: String,
  response: String,
});

const QueryLog = mongoose.model('QueryLog', queryLogSchema);

module.exports = {
  User,
  QueryLog,
};
