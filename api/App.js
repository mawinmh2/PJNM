const express = require('express');
const mongoose = require('mongoose');
const app = express();  
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const cors = require("cors")
app.use(cors());


app.get('/',(req, res) => {

});


const sec = require('./routes/Secantapi');
app.use('/Secant',sec);

mongoose.connect('mongodb+srv://mawin:mawin1975@cluster0-jjoep.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,userMongoClient:true}) 
console.log('HI connected DB')


app.listen(8000);