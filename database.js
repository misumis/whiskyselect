const mysql = require('mysql');
const mockdata = require('./mockdata.js');
const credentials = {
    host: "localhost",
    user: "root",
    password: "root",
}
switch (process.argv[2]){

    // CONNECT //
    case ("connect"):
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "whiskyselect"
    });
    break;

    // DROP //
    case ("drop"):
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "whiskyselect"
    });
    con.connect(function(err) {
        if (err) throw err;
        var sql = "DROP DATABASE whiskyselect";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Database deleted");
        });
    });
    break;
    // CREATE //
    case ("create"):
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("CREATE DATABASE whiskyselect", function (err, result) {
            if (err) throw err;
            console.log("Database created");
          });
        con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "whiskyselect"
        });
        var sql = "CREATE TABLE whisky (id VARCHAR(36) PRIMARY KEY, name VARCHAR(255), age INT, description TEXT, pictureUrl VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
        var insertData = "INSERT INTO whisky (id, name, age, description, pictureUrl) VALUES ?";
        con.query(insertData, [mockdata], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
          });
    });
    break;
    default:
    console.log("Pass an argument: drop / create / connect")
    break;
}