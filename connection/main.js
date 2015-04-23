var Sequelize = require('sequelize');

// db config
var env = "dev";
var config = require('../database.json')[env];

// initialize database connection
var connection = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.driver,
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

module.exports = connection;