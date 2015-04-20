var DataTypes = require("sequelize");

var Game = connection.define('game', {
    name: DataTypes.STRING
}, {
    freezeTableName: true,
    instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
            Game.findAll({}, {raw: true}).success(onSuccess).error(onError);
        },
        retrieveById: function (game_id, onSuccess, onError) {
            Game.find({where: {id: game_id}}, {raw: true}).success(onSuccess).error(onError);
        },
        add: function (onSuccess, onError) {
            var name = this.name;

            Game.build({ name: name })
                .save().success(onSuccess).error(onError);
        },
        updateById: function (game_id, onSuccess, onError) {
            var id = game_id;
            var name = this.name;

            Game.update({ name: name }, {where: {id: id} }).success(onSuccess).error(onError);
        },
        removeById: function (game_id, onSuccess, onError) {
            Game.destroy({where: {id: game_id}}).success(onSuccess).error(onError);
        }
    }
});

var router = express.Router();

router.route('/games')

// create a game (accessed at POST http://localhost:8080/api/games)
    .post(function (req, res) {

        var name = req.body.name; //bodyParser does the magic

        var game = Game.build({ name: name });

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

        game.updateById(req.params.game_id, function (success) {
            console.log(success);
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
