const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    affiliate: {
      type: String,
      requires: true
    },
    response: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.index({ email: 1, affiliate: 1 }, { unique: true });

mongoose.model('User', userSchema);
