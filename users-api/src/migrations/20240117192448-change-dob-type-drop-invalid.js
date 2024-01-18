'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Add a temporary date column
    await queryInterface.addColumn('Users', 'tempDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });

    // Step 2: Try to copy and convert valid date strings from the original column to the temporary column
    // Adjust this SQL for PostgreSQL
    await queryInterface.sequelize.query(`
      UPDATE "Users" 
      SET "tempDate" = CASE 
                        WHEN "dob" IS NOT NULL AND
                             "dob" ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' AND
                             "dob"::DATE IS NOT NULL
                        THEN "dob"::DATE
                        ELSE NULL
                      END
    `);

    // Step 3: Delete rows where conversion failed (tempDate is NULL)
    await queryInterface.bulkDelete('Users', {
      tempDate: null
    });

    // Step 4: Drop the original string column
    await queryInterface.removeColumn('Users', 'dob');

    // Step 5: Rename the temporary column to the original column name
    await queryInterface.renameColumn('Users', 'tempDate', 'dob');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'dob', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
