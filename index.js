const app= require('./app')
const mongoose = require("mongoose")
 
 

mongoose.connect('mongodb://localhost:27017/urlshortener', { 
});

app.listen("3000", ()=> {
  console.log("start listening on port 3000");
});