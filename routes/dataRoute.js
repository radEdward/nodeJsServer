var fs = require('fs');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "...",
    user: "...",
    password: "...",
    database: "..."
});

con.connect(function(err) {

    if (err) throw err;

    console.log('mysql connected...');

});



module.exports = function(app, db) {

    var dataFromFrontEnd;
    var userName;

    app.post('/signup', function(req, res) {

        dataFromFrontEnd = JSON.stringify(req.body);
        userName = JSON.stringify(req.body.username);
        userPass = JSON.stringify(req.body.password);
        userEmail = JSON.stringify(req.body.email);

        console.log(dataFromFrontEnd);


        var sql = "INSERT INTO nodeApp (username, userpass, userEmail) VALUES (" + "'" + userName + "'" + ", '" + userPass + "'" + ", '" + userEmail + "'" + ")"

            con.query(sql, function(err, result) {

                if (err) throw err;
                console.log('record inserted');

            });



        fs.readFile('dummy.json', function(err, data) {

            if (err) {console.log(err);}

            fs.writeFile('dummy.json', dataFromFrontEnd, function(err) {
                if (err) {console.log(err);}
            });

        });

        res.send();

    });



    app.post('/login', function(req, res) {

        dataFromFrontEnd = JSON.stringify(req.body);
        userName = JSON.stringify(req.body.username);
        userPass = JSON.stringify(req.body.password);

        console.log(dataFromFrontEnd);



        var sql = "SELECT userpass FROM nodeApp WHERE username = '" + userName + "'";

        con.query(sql, function(err, result) {

            if (err) throw err;
            if (result.length === 0) { console.log('username not found!'); return; }

            console.log('record checked');

            var passOnFile = result[0].userpass;
            console.log(passOnFile);

            if (passOnFile === userPass) {

                console.log('accepted!');

            } else { console.log('rejected!'); }

        });



        res.send();

    });



};
