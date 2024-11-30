const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    original: { type: String, required: true },
    alias: { type: String, required: true },
});

const Url = mongoose.model('Url', urlSchema);

Url.insertUrl = function(original , alias){
    const newUrl = new Url({
        original: original,
        alias: alias
    });
    
    newUrl.save()
        .then(() => console.log('URL saved successfully'))
        .catch(err => console.error('Error saving URL:', err));

}


module.exports = Url;
