const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const shortUrl = require("./models/shortUrl");
require("dotenv").config(); // .env won't work w/o this
// URL Validation Regex -- https://gist.github.com/dperini/729294
const validateURL = require("./libraries/regex-weburl.js");
// Used in lieu of Math.random() to generate a random string to be used as
// shortened URL
const uuidv4 = require("uuid/v4");

// Tell our express app to use the packages that we need:
server.use(bodyParser.json());
server.use(cors());

// Connect to database:
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);

// Allows node to find static content e.g. index.html
server.use(express.static(__dirname + "/public"));

// Creates the database entry
// note*: The parens with asterisk is necessary - avoids issue of interp as folder directory
server.get("/new/:urlToShorten(*)", (req, res, next) => {
  var urlToShorten = req.params.urlToShorten;
  if (validateURL.test(urlToShorten)) {
    const randStr = uuidv4() + ""
    const short = randStr.slice(0,10)
    let data = new shortUrl(
      {
        originalUrl: urlToShorten,
        shortUrl: short
      }
    )
    data.save(err=>{
      if(err){
        res.json("There was an error while saving data")
      }
    })
    res.json(data);
  } else {
    let data = new shortUrl(
      {
        originalUrl: urlToShorten,
        shortUrl: "shortURL not created -- URL Invalid"
      })
    res.json(data)
  }
});

// Query database and forward to originalURL:
server.get('/:urlToForward', (req,res,next)=>{
  // store value of urlToForward
var shorterUrl = req.params.urlToForward;
shortUrl.findOne({'shortUrl': shorterUrl}, (err, data)=>{
  if(err){
    res.send('Error reading database');
  } else {
    res.redirect(301, data.originalUrl)
  }

})
})

// Listen to see if everything is working
server.listen(process.env.port || 3000, () => {
  console.log("Everything is working");
});
