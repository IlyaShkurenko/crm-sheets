const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    options: {
      type: Object
    }
  },
  { timestamps: true }
);

mongoose.model('Log', logSchema);
