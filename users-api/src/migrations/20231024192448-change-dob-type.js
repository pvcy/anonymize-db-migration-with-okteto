'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add a temporary column
    await queryInterface.addColumn('Users', 'dob_temp', {
      type: Sequelize.DATEONLY,
    });

    // Convert and move the data from 'dob' to 'dob_temp'
    await queryInterface.sequelize.query(`
      UPDATE "Users" 
      SET "dob_temp" = "dob"::DATE
    `);

    // Remove the old 'dob' column
    await queryInterface.removeColumn('Users', 'dob');

    // Rename the 'dob_temp' column to 'dob'
    await queryInterface.renameColumn('Users', 'dob_temp', 'dob');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'dob', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};