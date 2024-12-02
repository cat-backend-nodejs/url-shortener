const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original : {type : String , require : true},
    alias    : {type : String , require : true}
})

const Url = mongoose.model('url' , urlSchema);


module.exports = Url;