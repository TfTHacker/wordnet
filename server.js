/* globals sqlite */

var express = require('express')
var compression = require('compression')
var helmet = require('helmet')
var bodyParser = require('body-parser')
var url = require("url")
var sqlite = require("./sqlite.js")  
var cors = require('cors')

var app = express()
app.use(cors())
app.use(helmet()) 
app.use(compression({ level: 9 }))
//app.set('json spaces', 1); //use for Pretty Printing formatting of JSON
app.set('json spaces', 0)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/query", function (request, response) {
  var params = url.parse(request.url,true).query;
  if(params.search){
      sqlite.query(params.search, function(results) {
      response.send(results)
    });    
  } 
});

// listen for requests :)
var listener = app.listen(process.env.PORT_DICT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port)
});



