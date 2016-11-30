var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var cors = require("cors");
var mongodb_uri = process.env.MONGODB_URI || "mongodb://aastha:rohini12@ds113678.mlab.com:13678/heroku_p5rkw9zt";
mongoose.connect(mongodb_uri);

var db_schema = new mongoose.Schema({

    match_id : String,
    year : Number,
    slam : String,
    match_num : Number,
    player1 : String,
    player2 : String,
    status : String,
    winner : Number,
    event_name : String,
    round : String,
    court_name : String,
    court_id : String,
    player1id : String,
    player2id : String,
    nation1 : String,
    nation2 : String

});

var collection = mongoose.model('collection', db_schema, 'collection1');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000

app.get("/", function(req, res){
    res.sendfile(__dirname + '/home_page.html');
})

app.get('/api/db_data', function(req, res){
    collection.find({},{"match_num":1, "_id" : 0},function(err, data){
        res.json(data);
    })
})

app.get('/api/db_data/:match_num', function(req, res){
    collection.findOne({match_num: req.params.match_num},{"_id" : 0},function(err, data){
        res.json(data);
    })
})
app.listen(port);
