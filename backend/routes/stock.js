var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.connection;
var stock = db.collection("retailstock");

router.get('/stock', function(req, res) {
  stock.find({}).toArray(function(err, docs){
    if (err){
      res.send(err);
    } else {
      res.statusCode = 200;
      res.send(docs);
    }
  });
});

module.exports = router;
