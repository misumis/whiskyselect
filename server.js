const express = require('express');

const bodyParser= require('body-parser')

const app = express();

const MongoClient = require('mongodb').MongoClient

const port = 5000;

var db

app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/whisky', (req, res) => {
    db.collection('whisky').find().toArray(function(err, results) {
        res.send(results)
    });
    
})

app.post('/api/whisky', (req, res) => {
    db.collection('whisky').save(req.body, (err, result) => {
      if (err) return console.log(err)
      res.redirect('/')
    })
})

MongoClient.connect('mongodb://admin:password123@ds133533.mlab.com:33533/whiskyselect',{ useNewUrlParser: true },(err, client) => {
    if (err) return console.log(err)
    db = client.db('whiskyselect') // whatever your database name is
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
