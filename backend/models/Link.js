const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  linkId: {
    type: String,
    required: true,
    unique: true,
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
  viewable: {
    type: Boolean,
    required: true,
  },
  editable: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;