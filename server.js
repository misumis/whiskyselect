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

// Item creation. Oh sweet Lord.
// Since tags filtering idea came up, I need to query to 2 tables. One is for creating an actual Item. 
// The second one is for making a relation between created item and tags that already exist.

app.post('/whisky', function (req, res) {
    var insertData = "INSERT INTO whisky (id, name, age, description, pictureUrl) VALUES ( ? , ? , ? , ? , ?)";
    var id = uuidv1();
    con.query(insertData, [id, req.body.name, req.body.age, req.body.description, req.body.pictureUrl], function (err, result) {
        if (err) {
            res.status(400).send({statusCode: err.code, message:err.message});
        }
        else{
            res.send({statusCode: res.statusCode, message:"Whisky saved!"});
        }
    });
    for ( var i = 0; i < req.body.tags.length; i++  ){
        var connectTags = "INSERT INTO whisky_tags (whisky_id, tag_id) VALUES ( ? , ? )"
        con.query( connectTags, [ id, req.body.tags[i] ] , function(err, result) {
            if (err) {
                res.status(400).send({statusCode: err.code, message:err.message});
            }
        })
    }
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

// TODO: Details should get Tags from whisky_tags
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
            console.log(res)
            res.status(200).send({statusCode: 200, message:"Whisky successfully deleted"})
        }
        if(result.affectedRows  === 0){
            res.status(404).send({statusCode: 404, message:"Could not find item"})
        }
    });
})

app.get('/tag', (req, res) => {
    con.query("SELECT id, name FROM tags ORDER BY name", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

// Fucking Shit Code below. I despise myself for creating this monstrosity.
// fucking endpoint needs better name
// braindead array creation from array of objects. obviously can be made easier
// It is supposed to return an array of whisky id's. Then it's filtered client-side

app.get('/whiskytags', (req, res) => {
    con.query(`SELECT whisky_id FROM whisky_tags WHERE tag_id = '${req.query.id}' `, function (err, result, fields) {
        if (err) throw err;
        var r = []
        for(var i = 0; i < result.length; i++){
            r.push(result[i].whisky_id)
        }
        res.send(r)
    });
})

// Tag deletion is discussable. Not gonna implement it yet. Same goes to tags edit.

app.post('/tag', function (req, res) {
    var insertData = "INSERT INTO tags ( id, name ) VALUES ( ? , ? )";
    var id = uuidv1()
    con.query(insertData, [id, req.body.name], function (err, result) {
        if (err) {
            res.status(400).send({statusCode: err.code, message:err.message});
        }
        else{
            res.send({statusCode: res.statusCode, message:"Tag saved!"});
        }
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})