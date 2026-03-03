"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RefreshTokens", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
      },
      tokenHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      revokedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("RefreshTokens");
  },
};