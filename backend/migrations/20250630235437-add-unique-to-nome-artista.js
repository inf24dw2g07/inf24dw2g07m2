'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Artistas', 'nome', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Artistas', 'nome', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    });
  }
};
