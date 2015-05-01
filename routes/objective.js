var connection = require('../connection/main');

var DataTypes = require("sequelize");
var express = require('express');

var Objective = connection.define('objective', {
    name: DataTypes.STRING,
    min_score_points: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    last_updated: DataTypes.DATE
}, {
    freezeTableName: true,
    instanceMethods: {
        retrieveJoin: function (onSuccess, onError) {
            connection.query("select * from objective left join episode on episode.id = objective.episode_id").then(onSuccess);
        },
        retrieveAll: function (onSuccess, onError) {
            Objective.findAll({}, {raw: false}).then(onSuccess).catch(onError);
        },
        retrieveJoinById: function (objectiveId, onSuccess, onError) {
            connection.query("select * from objective left join episode on episode.id = objective.episode_id where objective.id = " + objectiveId).then(onSuccess);
        },
        retrieveById: function (objectiveId, onSuccess, onError) {
            Objective.find({where: {id: objectiveId}}, {raw: false}).then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
            var title = this.title;

            var date_created = new Date();
            var last_updated = new Date();

            Objective.build({ title: title, date_created: date_created, last_updated: last_updated })
                .save().then(onSuccess).catch(onError);
        },
        updateById: function (objectiveId, onSuccess, onError) {
            var id = objectiveId;
            var title = this.title;

            var last_updated = new Date();

            Objective.update({ title: title, last_updated: last_updated}, {where: {id: id} }).then(onSuccess).catch(onError);
        },
        removeById: function (objectiveId, onSuccess, onError) {
            Objective.destroy({where: {id: objectiveId}}).then(onSuccess).catch(onError);
        }
    }
});

var router = express.Router();

router.route('/objectives')

// create a objective (accessed at POST http://localhost:8080/api/objectives)
    .post(function (req, res) {

        var title = req.body.title; //bodyParser does the magic

        var objective = Objective.build({ title: title });

        objective.add(function (success) {
                res.json({ message: 'Game created!' });
            },
            function (err) {
                res.send(err);
            });
    })

// get all the objectives (accessed at GET http://localhost:8080/api/objectives)
    .get(function (req, res) {
        var objective = Objective.build();

        objective.retrieveJoin(function (objectives) {
            objectives = objectives[0];
            if (objectives) {
                res.json(objectives);
            } else {
                res.send(401, "Objectives not found");
            }
        }, function (error) {
            res.send("Objectives not found");
        });
    });


// on routes that end in /objectives/:objective_id
// ----------------------------------------------------
router.route('/objectives/:objective_id')

// update a objective (accessed at PUT http://localhost:8080/api/objectives/:objective_id)
    .put(function (req, res) {
        var objective = Objective.build();

        objective.title = req.body.title; //bodyParser does the magic

        objective.updateById(req.params.objective_id, function (success) {
            if (success) {
                res.json({ message: 'Objective updated!' });
            } else {
                res.send(401, "Objective not updated");
            }
        }, function (error) {
            res.send("Game not found");
        });
    })

// get a objective by id(accessed at GET http://localhost:8080/api/objectives/:objective_id)
    .get(function (req, res) {
        var objective = Objective.build();

        objective.retrieveJoinById(req.params.objective_id, function (objectives) {
            objectives = objectives[0];
            if (objectives) {
                objectives = objectives[0];
                res.json(objectives);
            } else {
                res.send(401, "Objective not found");
            }
        }, function (error) {
            res.send("Objective not found");
        });
    })

// delete a objective by id (accessed at DELETE http://localhost:8080/api/objectives/:objective_id)
    .delete(function (req, res) {
        var objective = Objective.build();

        objective.removeById(req.params.objective_id, function (objectives) {
            if (objectives) {
                res.json({ message: 'Objective removed!' });
            } else {
                res.send(401, "Objective not removed");
            }
        }, function (error) {
            res.send("Objective not found");
        });
    });

module.exports = router;
