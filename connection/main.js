var Sequelize = require('sequelize');

// db config
var env = "dev";
var config = require('../database.json')[env];
var password = config.password ? config.password : null;

// initialize database connection
var connection = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: 'aws-lab-01.ctdefwl0ev9y.us-west-2.rds.amazonaws.com',
        dialect: config.driver,
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

module.exports = connection;