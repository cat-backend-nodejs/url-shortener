const mongoose = require('mongoose')

const connectDatabase = async function(){
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("connect database successfully")
    } catch(err){
        console.error("Error connecting to MongoDB:", err)
    }
}

module.exports = connectDatabase;