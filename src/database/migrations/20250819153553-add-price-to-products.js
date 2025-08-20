"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "price", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "price", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
