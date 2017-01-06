// server.js
// Process and send the data to client on request
// =============================================================================

// call the packages we need
var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(session({secret: 'ssshhhhh',
        resave: true,
        saveUninitialized: true}));




var port = process.env.PORT || 8080;        // set our port

// Routes for our api
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var sess;

router.get('/', function(req, res) {
	console.log('request is -->'+ req.body.country);
  sess = req.session;

  if(sess.stack) {
    res.redirect('/getStack');
  }
  else {
    res.sendFile('./public/index.html');
  }

});


app.get('/getStack', function(request, response) {
  console.log('request on getStack -->'+request.url);
  sess = request.session;

  if(sess.stack) {
    response.send(sess.stack);
  } 
});


//http request to send the converted data 
app.get('/convert', function(request, response) {
  console.log('request on convert -->'+request.url);
  var value =request.query.value;
  sess = request.session;

  if(sess.stack) {
    value= sess.stack+','+value;
    sess.stack=value;
  }
  else{
    sess.stack=value;
  }
  response.send(value);
  
});



app.get('/reset', function(request, response) {
  console.log('request on rest -->'+request.url);
  sess = request.session;
  sess.stack='';
  response.send(sess.stack);
});


app.get('/pop', function(request, response) {
  console.log('request on pop -->'+request.url);
  sess = request.session;
  var value= sess.stack;
  if(value){
   var arr= value.split(',');
   arr.pop();
   sess.stack=arr.join();
   response.send(sess.stack);
 }else{
  response.send('');
}

});


app.use('/', router);

// Start the Server
//=================================//
app.listen(port);
console.log('Magic happens on port ' + port);
