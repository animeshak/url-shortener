const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://admin12:admin@cluster0.ochalr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlparser : true,
            useUnifiedTopology : true
        });
        console.log('Connected To DB .....')
    }
    catch(err){
        console.log('Error connecting to DB', err);
    }
}

module.exports = connectDB;