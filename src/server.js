const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const urlRoutes = require('./routes/urlRoutes')
// const path = require('path')

const app = express();
const PORT = 3000;

//connection 
connectDB();

//middleware 
app.use(bodyParser.json());


app.use('/',urlRoutes);
app.use(express.static('public'))

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`);
})