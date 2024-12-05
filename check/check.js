const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/URLs';

const connectdatabase = async function(){
    try{

        await mongoose.connect(mongoURI);
        console.log("connect database succesfully")
    }  catch(err){ 
        console.error("Error connecting to MongoDB:", err)
    }
}


module.exports = connectdatabase;

