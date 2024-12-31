const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  downloadedSongs: [
    {
      songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
      downloadDate: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Download', downloadSchema);
