const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require('body-parser');
const app = express();
const protectedRoute = express.Router();
const postM = require('./Models/posts');
const student = require('./Models/posts');
const postR = require('./Routes/posts');
const port = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/testdb').then(()=>{
    console.log("Connected to the DB")
}).catch(()=>{
    console.log("Connection failed")
});



app.set('key','secret');

protectedRoute.use((req, res, next) => {
    const token = req.headers["access-token"];
    if(token){
        jwt.verify(token, app.get('key'), (err, decoded)=>{
            if(err){
                return res.send({'msg':'Invalid token'})
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.send({'msg':'Token not provided'});
    }
});

app.use(express.json());
app.use(cors());

app.use("/api", postR);

app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type");
    next();
 });

 app.get('/api/hello', function(req, res){
    res.send({
        msg:'Hello',
        content: 'Random content'
    });
 });

 app.put('/api/put', function(req, res){
    res.send({
        msg:'Hello',
        content: 'This a put'
    });
 });

 app.delete('/api/deleted', function(req, res){
    res.send({
        msg:'Hello',
        content: 'deleted message'
    });
 });

 app.post('/api/new', function(req, res){
    let body = req.body;
    res.send({
        msg: 'Hola',
        content:`${body.hola}`
    });
 });



 app.listen(port, function(){
     console.log('Api is running')
 });