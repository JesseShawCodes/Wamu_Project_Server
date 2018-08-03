const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/wamu_project_db", { useNewUrlParser: true });

var { Projectinput } = require('./models/projectData')

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send("WAMU App Backend");
})

app.get('/data', function(req, res) {
    Projectinput
    .find({})
    .then(function(data) {
        let returnArray = [] 
        for (let i =0; i < data.length; i++) {
            if(returnArray.indexOf(data[i]) == -1) {
                returnArray.push(data[i]);
            }
        }
        console.log(returnArray)
        res.send(returnArray)
        }
    )
})

//RETURN Project Title
app.get('/project-title/:id', function(req, res) {
    let ret = [];
    Projectinput
        .find()
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
                if (req.params.id === data[i].project) {
                    ret.push(data[i])
                }
            }
            res.send(ret)
        }
        )
})

app.post('/', function(req, res) {
    var myData = new Projectinput(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
})

app.listen(PORT, () => {
    console.log(`Your Server is Running on PORT: ${PORT}`)
})

module.exports = { app };