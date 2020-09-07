const { Sequelize } = require("sequelize");
const  database  = require("../database");
const OP = Sequelize.Op;

const Nominees = database.define("nominees", {
    movie_imdbID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    movie_title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    movie_poster: {
        type: Sequelize.STRING,
        allowNull: false
    },
    movie_year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    movie_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    movie_votes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = {
    Nominees,
    database
};