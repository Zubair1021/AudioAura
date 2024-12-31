const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  songId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Song', 
    required: true 
  },
  addedAt: { 
    type: Date, 
    default: Date.now 
  },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
