'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.renameColumn('payments', 'typeId', 'type');
      await queryInterface.changeColumn('payments', 'type', {
        type: Sequelize.STRING,
        allowNull: false, // Opcional, dependiendo de tus requisitos
      });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.changeColumn('payments', 'type', {
        type: Sequelize.INTEGER, // Reemplaza OldTipoDeDato con el tipo de dato original
        allowNull: false, // Opcional, dependiendo de tus requisitos
      });
      await queryInterface.renameColumn('payments', 'type', 'typeId');
  }
};
