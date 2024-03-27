'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {  id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    creator: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    typeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    recipient: {
      type: Sequelize.BIGINT,
      allowNull: false,
    }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};
