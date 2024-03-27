'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('payments', 'recipient', {
      type: Sequelize.STRING,
      allowNull: false, // Opcional, dependiendo de tus requisitos
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('payments', 'recipient', {
      type: Sequelize.BIGINT, // Reemplaza OldTipoDeDato con el tipo de dato original
      allowNull: false, // Opcional, dependiendo de tus requisitos
    });
  }
};
