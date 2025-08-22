'use strict';
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(
   __dirname,
   '..',
   'config',
   'config.json'
);
const config = require(configPath)[env];

const db = {};

const sequelize = new Sequelize(
   config.database,
   config.username,
   config.password,
   config
);

fs.readdirSync(__dirname)
   .filter((file) => {
      return (
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
      );
   })
   .forEach((file) => {
      const model = require(path.join(__dirname, file))(
         sequelize,
         DataTypes
      );
      db[model.name] = model;
   });

Object.keys(db).forEach((modelName) => {
   if (db[modelName].associate) {
      db[modelName].associate(db);
   }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
   .sync()
   .then(() => {
      console.log('All tables created successfully (if not exist)');
   })
   .catch((err) => {
      console.error('Error syncing database:', err);
   });

module.exports = db;
