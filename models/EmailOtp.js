'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmailOtp extends Model {
    static associate(models) {
      // define associations here if needed
    }
  }

  EmailOtp.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'otp_hash' // maps to snake_case DB column
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'EmailOtp',
    tableName: 'email_otps',
    underscored: true, // maps created_at ↔ createdAt, updated_at ↔ updatedAt
    timestamps: true   // enables Sequelize to expect/manage createdAt/updatedAt
  });

  return EmailOtp;
};
