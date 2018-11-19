const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Tell our express app to use the packages that we need:
server.use(bodyParser.json());
server.use(cors());

// Allows node to find static content index.html
server.use(express.static(__dirname + "/public"));

// Creates the database entry
// note*: The parens with asterisk is necessary - avoids issue of interp as folder directory
server.get("/new/:urlToShorten(*)", (req, res, next)=>{
// 
var urlToShorten = req.params.urlToShorten
res.json({urlToShorten: urlToShorten})
})



// Listen to see if everything is working
// Process is for if on Heroku
server.listen(process.env.port || 3000, ()=>{
  console.log("Everything is working");
})