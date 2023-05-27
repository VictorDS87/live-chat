const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  __user: {
    type: String,
    required: true,
    unique: true
  },
  
  __nickname: {
    type: String,
    required: true
  },

  __password: {
    type: String,
    required: true
  },

  __securyQuestion: {
    type: String,
    required: true
  },

  __securyQuestionPassword: {
    type: String,
    required: true
  }
}, {
  collection: 'users'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;