// models/Playlist.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  songs: {
    type: [Schema.Types.ObjectId],
    ref: 'Song',
    default: [],
  },
  status: {
    type: String,
    default: 'active',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
