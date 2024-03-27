'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paymentsTypes', {

      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('paymentsTypes');

  }
};
