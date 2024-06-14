const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    long: { type: String, required: true },
    alias: { type: String, required: true }
}, { timestamps: true })

const URL = mongoose.model('URL', urlSchema);
module.exports = URL;