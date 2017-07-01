//Smashframes.com backend: nodejs, MongoDB, express
var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var mongo_url = 'mongodb://localhost:27017/smashframes'
//db for now
var Tabletop = require("tabletop");
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1rdz4i8qbE9mi44lkW2_ByQZODiwU4UUF--ZizCFdIHo/pubhtml';
var data = []

Tabletop.init( { key: publicSpreadsheetUrl,
                  callback: function (_data) {
                    data = _data;
                  },
                  simpleSheet: true } )
//        
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')
// Routes
app.get("/", function(req, res) {
  res.redirect("/frame_data");
})
app.get("/frame_data", function(req, res)) {
  res.render("index.ejs");
}

//API
//Get Frame Data as JSON
app.get("/api/frame_data", function(req, res)) {
  
}

app.listen(8080);