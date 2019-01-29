const express = require('express');
const formidable = require('formidable');
const bodyParser= require('body-parser')
const mysql = require('mysql');
const uuidv1 = require('uuid/v1');
const app = express();

// const MongoClient = require('mongodb').MongoClient

const port = 5000;

var db

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "whiskyselect"
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// WHISKY CRUD //

app.get('/whisky', (req, res) => {
    con.query("SELECT id, name, age FROM whisky ORDER BY name", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})


app.post('/whisky', function (req, res) {
    var insertData = "INSERT INTO whisky (id, name, age, description, pictureUrl) VALUES ( ? , ? , ? , ? , ?)";
    var id = uuidv1()
    con.query(insertData, [id, req.body.name, req.body.age, req.body.description, req.body.pictureUrl], function (err, result) {
        if (err) {
            res.status(400).send({statusCode: err.code, message:err.message});
        }
        else{
            res.send({statusCode: res.statusCode, message:"Whisky saved!"});
        }
    });
})

app.put('/whisky/:whiskyId', function (req, res) {
    var insertData = `UPDATE whisky SET name="${req.body.name}", age=${req.body.age}, description="${req.body.description}", pictureUrl="${req.body.pictureUrl}"  WHERE id='${req.params.whiskyId}'`;
    con.query(insertData, function (err, result) {
        if (err) {
            res.status(400).send({statusCode: err.code, message:err.message});
        }
        else{
            res.send({statusCode: res.statusCode, message:"Whisky updated!"});
        }
    });
})

app.get('/whisky/:whiskyId', (req, res, next) => {
    const query = `SELECT * FROM whisky WHERE id = '${req.params.whiskyId}'`
    con.query(query, function (err, result) {
        if (err) throw err;
        if (result[0] === undefined){
            res.status(404).send({error:true,message:"Item not found"});
        }
        else{
            res.send(result[0]);
        }
    });
})

app.delete('/whisky/:whiskyId', (req,res,next) => {
    const query = `DELETE FROM whisky WHERE id = '${req.params.whiskyId}'`
    con.query(query, function (err, result) {
        if (err) {
            res.status(400).send({statusCode: err.code, message:"Oops.."})
        };
        if (result.affectedRows > 0){
            res.status(204).send({statusCode: res.statusCode, message:"Whisky successfully deleted"})
        }
        if(result.affectedRows  === 0){
            res.status(404).send({statusCode: 404, message:"Could not find item"})
        }
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})