var express = require("express");
var path = require("path");
var app = express();


// static content (disabled)
//app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})

/*app.post('/result', function(req, res) {
 console.log("POST DATA", req.body);
 res.render('results', req.body);
})*/

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

// When a connection event happens (connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
  console.log('Socket ID:',socket.id);
  //all the socket code goes in here!
 socket.on("form_submit", function (data){
    //console.log('The OS is: ' + data.browse + data.os);
    socket.emit('random_number', {browse: data.browse, 
                                    os: data.os,
                                    lang: data.lang,
                                    comment: data.comment});
})


})
