var express = require('express');
var router = express.Router();
var events = require('events');
var util = require('util');
var connections = {};
var killId = "";

var Foo = function(initial_id) { this.id = initial_id; };
Foo.prototype = new events.EventEmitter;
Foo.prototype.setId = function(id) {
  var self = this;
  self.id = id;
  self.emit('kill');
};
var killer = new Foo(-1);

router.get('/request', function(req, res, next) {
  var connId = req.query.connId;
  var timeout = req.query.timeout;

  connections[connId.toString()] = [+new Date(),parseInt(timeout)*1000];
  console.log(connections);
  setTimeout(function() {
    if(connections[connId.toString()]){
      delete connections[connId.toString()];
      res.json({status:"ok"});
    }
  }, parseInt(timeout)*1000);

  killer.on('kill', function(){
    if(connId == this.id){
      res.json({status : "killed"});
    }
  })
});

router.get('/serverStatus', function(req, res, next) {
  var obj = {};
  var curTime = +new Date();
  for (var a in connections){
    obj[a] = (connections[a][1] - (curTime - connections[a][0]))/1000; //timeout - (currtime - initialtime)
  };
  res.json(obj);

});

router.put('/kill', function(req, res, next) {
  console.log('kill: /n connId: '+req.query.connId);
  var killerId = req.query.connId;
  console.log("killerId: "+killerId);
  delete connections[killerId.toString()];
  killer.setId(killerId);
  res.json({status : "ok"});
});

module.exports = router;
