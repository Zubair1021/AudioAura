const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [1, 0],
        default: 1,
    },
    premium: {
        type: String,
        enum: ['none', 'monthly', 'yearly'],
        default: 'none',
    },
    premiumExpiresAt: { 
        type: Date, 
        default: null 
    },
    history: [
        {
            query: {
                type: String,
                required: true,
            },
            searchedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
