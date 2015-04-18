//var Movie = require('../models/movie');
var express = require('express');

var router = express.Router();

router.route('/movies')
    .get(function (req, res) {
        var mList = [
            {_id: "AGD", title: "Die Hard", genre: "Action", director: "Director 1", releaseYear: "1999"},
            {_id: "HGD", title: "Terminator 2", genre: "Action", director: "James Cameron", releaseYear: "1992"},
            {_id: "JKL", title: "Gone with the Wind", genre: "Drama", director: "Director 2", releaseYear: "1939"},
            {_id: "ERT", title: "West Side Story", genre: "Drama", director: "Director 3", releaseYear: "1962"}
        ];
        res.json(mList);
    })

    .post(function (req, res) {
        var movie = {title: req.body.title, genre: req.body.genre};
        console.log(movie);
        res.send({message: "Movie Added"})
    });

router.route('/movies/:id')
    .get(function (req, res) {
        var movie = {_id: req.params.id, title: "C", genre: "Y", director: "F", releaseYear: "2009"};

        res.json(movie);
    })
    .put(function (req, res) {
// to be filled in
    })
    .delete(function (req, res) {
// to be filled in
    });

module.exports = router;