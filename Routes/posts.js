const express = require('express');
const postM = require('../Models/posts');
const postR = express.Router();

postR.post('/postR', (req, res, next) => {
    const post = new postM({
        studentname: req.body.studentname,
        studentlastname: req.body.studentlastname
    });
    post.save().then(createdPost => {
        console.log(createdPost.id);
    })
    res.status(200).json({
        message: "Post added successfully"
    });
    next();
})

module.exports = postR;