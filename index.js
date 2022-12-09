var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var scripts = require('./scripts.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(scripts.rateLimiter)

app.post('/generate', function(req,res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  res.send(JSON.stringify({"test":"lol"}))
})

app.listen(8000, function () {
   console.log('App listening on port 8000!');
});
