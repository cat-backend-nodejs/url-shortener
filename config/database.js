const mongoose = require('mongoose')

async function connectDatabase(){
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("connect to database successfully");
    }catch(err){
        console.error("can't connect to database :" , err);
    }
}

module.exports = connectDatabase;