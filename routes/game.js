var connection = require('../connection/main');

var DataTypes = require("sequelize");
var express = require('express');

var Game = connection.define('game', {
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    download_price: DataTypes.FLOAT,
    date_created: DataTypes.DATE,
    last_updated: DataTypes.DATE
}, {
    freezeTableName: true,
    instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
            Game.findAll({}, {raw: false}).then(onSuccess).catch(onError);
        },
        retrieveById: function (gameId, onSuccess, onError) {
            Game.find({where: {id: gameId}}, {raw: false}).then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
            var name = this.name;
            var active = this.active;
            var download_price = this.download_price;
            var date_created = new Date();
            var last_updated = new Date();

            Game.build({ name: name, active: active, download_price: download_price,
                date_created: date_created, last_updated: last_updated })
                .save().then(onSuccess).catch(onError);
        },
        updateById: function (gameId, onSuccess, onError) {
            var id = gameId;
            var name = this.name;
            var active = this.active;
            var download_price = this.download_price;
            var last_updated = new Date();

            Game.update({ name: name, active: active, download_price: download_price, last_updated: last_updated }, {where: {id: id} }).then(onSuccess).catch(onError);
        },
        removeById: function (gameId, onSuccess, onError) {
            Game.destroy({where: {id: gameId}}).then(onSuccess).catch(onError);
        }
    }
});

var router = express.Router();

router.route('/games')

// create a game (accessed at POST http://localhost:8080/api/games)
    .post(function (req, res) {

        var name = req.body.name; //bodyParser does the magic
        var active = req.body.active;
        var download_price = req.body.download_price;

        var game = Game.build({ name: name, active: active, download_price: download_price });

        game.add(function (success) {
                res.json({ message: 'Game created!' });
            },
            function (err) {
                res.send(err);
            });
    })

// get all the games (accessed at GET http://localhost:8080/api/games)
    .get(function (req, res) {
        var game = Game.build();

        game.retrieveAll(function (games) {
            if (games) {
                res.json(games);
            } else {
                res.send(401, "Games not found");
            }
        }, function (error) {
            res.send("Games not found");
        });
    });


// on routes that end in /games/:game_id
// ----------------------------------------------------
router.route('/games/:game_id')

// update a game (accessed at PUT http://localhost:8080/api/games/:game_id)
    .put(function (req, res) {
        var game = Game.build();

        game.name = req.body.name; //bodyParser does the magic
        game.active = req.body.active;
        game.download_price = req.body.download_price;

        game.updateById(req.params.game_id, function (success) {
            if (success) {
                res.json({ message: 'Game updated!' });
            } else {
                res.send(401, "Game not updated");
            }
        }, function (error) {
            res.send("Game not found");
        });
    })

// get a game by id(accessed at GET http://localhost:8080/api/games/:game_id)
    .get(function (req, res) {
        var game = Game.build();

        game.retrieveById(req.params.game_id, function (games) {
            if (games) {
                res.json(games);
            } else {
                res.send(401, "Game not found");
            }
        }, function (error) {
            res.send("Game not found");
        });
    })

// delete a game by id (accessed at DELETE http://localhost:8080/api/games/:game_id)
    .delete(function (req, res) {
        var game = Game.build();

        game.removeById(req.params.game_id, function (games) {
            if (games) {
                res.json({ message: 'Game removed!' });
            } else {
                res.send(401, "Game not removed");
            }
        }, function (error) {
            res.send("Game not found");
        });
    });

module.exports = router;
