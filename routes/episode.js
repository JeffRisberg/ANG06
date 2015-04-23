var connection = require('../connection/main');

var DataTypes = require("sequelize");
var express = require('express');

var Episode = connection.define('episode', {
    title: DataTypes.STRING
}, {
    freezeTableName: true,
    instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
            Episode.findAll({}, {raw: true}).then(onSuccess).catch(onError);
        },
        retrieveById: function (episode_id, onSuccess, onError) {
            Episode.find({where: {id: episode_id}}, {raw: true}).then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
            var title = this.title;

            Episode.build({ title: title })
                .save().then(onSuccess).catch(onError);
        },
        updateById: function (episode_id, onSuccess, onError) {
            var id = episode_id;
            var title = this.title;

            Episode.update({ title: title }, {where: {id: id} }).then(onSuccess).catch(onError);
        },
        removeById: function (episode_id, onSuccess, onError) {
            Episode.destroy({where: {id: episode_id}}).then(onSuccess).catch(onError);
        }
    }
});

var router = express.Router();

router.route('/episodes')

// create a episode (accessed at POST http://localhost:8080/api/episodes)
    .post(function (req, res) {

        var title = req.body.title; //bodyParser does the magic

        var episode = Episode.build({ title: title });

        episode.add(function (success) {
                res.json({ message: 'Game created!' });
            },
            function (err) {
                res.send(err);
            });
    })

// get all the episodes (accessed at GET http://localhost:8080/api/episodes)
    .get(function (req, res) {
        var episode = Episode.build();

        episode.retrieveAll(function (episodes) {
            if (episodes) {
                res.json(episodes);
            } else {
                res.send(401, "Episodes not found");
            }
        }, function (error) {
            res.send("Episodes not found");
        });
    });


// on routes that end in /episodes/:episode_id
// ----------------------------------------------------
router.route('/episodes/:episode_id')

// update a episode (accessed at PUT http://localhost:8080/api/episodes/:episode_id)
    .put(function (req, res) {
        var episode = Episode.build();

        episode.title = req.body.title; //bodyParser does the magic

        episode.updateById(req.params.episode_id, function (success) {
            console.log(success);
            if (success) {
                res.json({ message: 'Episode updated!' });
            } else {
                res.send(401, "Episode not updated");
            }
        }, function (error) {
            res.send("Game not found");
        });
    })

// get a episode by id(accessed at GET http://localhost:8080/api/episodes/:episode_id)
    .get(function (req, res) {
        var episode = Episode.build();

        episode.retrieveById(req.params.episode_id, function (episodes) {
            if (episodes) {
                res.json(episodes);
            } else {
                res.send(401, "Episode not found");
            }
        }, function (error) {
            res.send("Episode not found");
        });
    })

// delete a episode by id (accessed at DELETE http://localhost:8080/api/episodes/:episode_id)
    .delete(function (req, res) {
        var episode = Episode.build();

        episode.removeById(req.params.episode_id, function (episodes) {
            if (episodes) {
                res.json({ message: 'Episode removed!' });
            } else {
                res.send(401, "Episode not removed");
            }
        }, function (error) {
            res.send("Episode not found");
        });
    });

module.exports = router;
