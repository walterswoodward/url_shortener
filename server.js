const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Tell our express app to use the packages that we need:
server.use(bodyParser.json());
server.use(cors());

// Listen to see if everything is working
// Process is for if on Heroku
server.listen(process.env.port || 3000, ()=>{
  console.log("Everything is working");
})