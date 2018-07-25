var faker = require('faker');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

var connection = mysql.createConnection({
  host       : 'localhost',
  user       : 'root',
  password   : 'password',
  database   : 'node'
});

connection.on('error', function(err) {
    console.log("[mysql error]",err);
  });

// if (connection) {
//     console.log('WORKING');
// } else {
//     console.log('BROKE!!!!');
// }


// SELECTING ALL USERS
// var q = 'SELECT * FROM users';

// connection.query(q, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results[0].email);
//  });


// // INSERT NEW USERS
// var person = { email: faker.internet.email() }

// var q = 'INSERT INTO users SET ?';

// connection.query(q, person, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//  });

//  connection.end();


// INSERT NEW USERS IN BULK!!!
// var data = [];

// for (var i = 0; i < 500; i++) {
//     data.push(
//         [faker.internet.email(), faker.date.past()]
//     );
// }

// var q = 'INSERT INTO users(email, created_at) VALUES ?';

// connection.query(q, [data], function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//  });

//  connection.end();

app.get('/', function(req, res) {

    var q = 'SELECT COUNT(*) AS count FROM users';

    connection.query(q, function (error, results) {
        if (error) throw error;
        var count = results[0].count;
        // res.send(`I have ${count} users in my database!`);
        res.render('home', { data: count });
    });
});

app.post('/register', function(req, res) {
    var person = { email: req.body.email };

    var q = 'INSERT INTO users SET ?';

    connection.query(q, person, function (error, result) {
        if (error) throw error;
        res.redirect('/');
     });
});

app.listen(8080, function() {
    console.log('app running on port 8080!!!');
});