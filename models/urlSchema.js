const mongoose = require("mongoose");

const urlsc = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },

    shortUrl: {
        type: String,
        required: true,
    },
});

const Url = mongoose.model("shortenedUrl", urlsc);

module.exports = Url;