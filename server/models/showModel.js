const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    poster: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    isSeries: {
        type: Boolean,
        required: true,
    },
    seasons: [{
        episodes: [{
            video: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
        }],
        trailer: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    }],
    castMembers: [{
        image: {
            type: String,
            required: true,
        },
        reelName: {
            type: String,
            required: true,
        },
        realName: {
            type: String,
            required: true,
        },
    }],
}, { timestamps: true });

const Show = mongoose.model("Show", showSchema);
module.exports = Show;
