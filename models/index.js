'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../configs/database')[env];

const db = {};

let sequelize;

try {
  if (!config) throw new Error(`Database config for environment "${env}" not found.`);

  sequelize = new Sequelize(config);

  // Explicitly check DB connection
  sequelize.authenticate()
    .then(() => console.log('✅ Database connected successfully.'))
    .catch((error) => {
      console.error('❌ Database connection failed:', error.message);
      process.exit(1);
    });

} catch (error) {
  console.error('🚨 Sequelize initialization error:', error.message);
  process.exit(1);
}

// Load models dynamically
fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.js') && file !== basename && !file.endsWith('.test.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Apply model associations if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Expose Sequelize instance & constructor
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
