const { Sequelize } = require('sequelize');
const md5 = require('md5');

const uuid = require('uuid/v4');
require('dotenv').config();


const Conn = new Sequelize(process.env.DB_CON, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});


const User = Conn.define('user', {
  _id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuid()
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});


module.exports = Conn;
