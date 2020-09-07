'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nominees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  nominees.init({
    movie_imdbID: DataTypes.STRING,
    movie_title: DataTypes.STRING,
    movie_poster: DataTypes.STRING,
    movie_year: DataTypes.STRING,
    movie_type: DataTypes.STRING,
    movie_votes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'nominees',
  });
  return nominees;
};