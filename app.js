var faker = require('faker');
var mysql = require('mysql');
 
var connection = mysql.createConnection({
  host       : 'localhost',
  user       : 'root',
  password   : 'password',
  database   : 'node'
});

if (connection) {
    console.log('WORKING');
} else {
    console.log('BROKE!!!!');
}


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
var data = [];

for (var i = 0; i < 500; i++) {
    data.push(
        [faker.internet.email(), faker.date.past()]
    );
}

var q = 'INSERT INTO users(email, created_at) VALUES ?';

connection.query(q, [data], function (error, results, fields) {
    if (error) throw error;
    console.log(results);
 });

 connection.end();