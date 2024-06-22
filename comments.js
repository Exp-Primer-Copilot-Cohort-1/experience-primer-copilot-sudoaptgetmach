// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./comment.js');
mongoose.connect('mongodb://localhost/comments');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create a comment
app.post('/comments', function (req, res) {
    var comment = new Comment(req.body);
    comment.save(function (err) {
        if (err)
            res.send(err);
        res.send({ message: 'Comment Created' });
    });
});

// Get all comments
app.get('/comments', function (req, res) {
    Comment.find(function (err, comments) {
        if (err)
            res.send(err);
        res.json(comments);
    });
});

// Get one comment
app.get('/comments/:id', function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
});

// Update a comment
app.put('/comments/:id', function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err)
            res.send(err);
        Object.assign(comment, req.body).save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment updated!' });
        });
    });
});

// Delete a comment
app.delete('/comments/:id', function (req, res) {
    Comment.remove({
        _id: req.params.id
    }, function (err, comment) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

app.listen(3000);
console.log('Listening on port 3000...');