const mongoose = require('mongoose');

const urlschema = new mongoose.Schema({
    urlInput: {
        type: String,
        required:true,
    },
    aliasInput: {
        type: String,
        required:true,
    }
});

const URL = mongoose.model('URL',urlschema , 'urls'); //note that if we don't name the collection with (urls) it will automatically call it "urls" beacause of lowercase and ploralize od the model name URL 

module.exports = URL;
