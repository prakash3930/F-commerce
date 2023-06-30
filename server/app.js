const {readdirSync} = require('fs');
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const {PORT,DATA_BASE} = process.env;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// app.use use........
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());


// connect router file ...

readdirSync('./routes').map(R=>app.use('/api/v1',require(`./routes/${R}`)));


// err router ...

app.use('*',(req,res)=>{
    res.status(404).json({message:"this page not found."});
});

// server err.....
app.use((err,req,res)=>{
    res.status(400).json({message:"server is broken."});
});

// exports...
module.exports = {PORT,app,DATA_BASE,mongoose};