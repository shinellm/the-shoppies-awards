'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nominees', {
      movie_imdbID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      movie_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      movie_poster: {
        allowNull: false,
        type: Sequelize.STRING
      },
      movie_year: {
        allowNull: false,
        type: Sequelize.STRING
      },
      movie_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      movie_votes: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('nominees');
  }
};