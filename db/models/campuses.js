const db = require( '../../db');
const Sequelize = require('sequelize');

module.exports = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  }
});
