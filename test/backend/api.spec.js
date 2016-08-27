var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../backend/server.js');
var expect = chai.expect;
var mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Stock', function(){
  before(function(done){
    mongoose.connection.once('open', function() {
      console.log("database connected");
      done();
    });
  });

  it('should list all stocks GET', function(done){
    chai.request(server)
      .get('/api/stock')
      .end(function(err, res){
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        done();
      });
  });
});
