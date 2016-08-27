var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var stock = require('./routes/stock.js');

var database = require('./config/db');

var port = process.env.PORT || 3000;

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
              replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.connect(database.url, options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', stock);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  app.listen(port, function(){
    console.log('Server is loaded on port: ' + port);
  });
});

exports = module.exports = app;
