const db = require( '../../db');
const Sequelize = require('sequelize');

module.exports = db.define('students', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
