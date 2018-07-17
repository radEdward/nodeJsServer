var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;
var fs = require('fs');
var bodyParser = require('body-parser');
var dummy = require('./dummy');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app, {});



app.get('/dummy', function(req, res) {

    fs.readFile('dummy.json', function(err, data){

        res.write(data);
        res.end();

    })

});

app.get('/signup', function(req, res) {

});

app.get('/login', function(req, res) {

});



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {

    res.render('index');

});

app.get('/userPage', function(req, res) {

    res.render('userPage');

});



app.listen(port, function() {

    console.log("running on port: " + port);

});