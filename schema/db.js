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
  seenArr: {
    type: Sequelize.STRING
  },
  caughtArr: {
    type: Sequelize.STRING
  }
});

const Pokemon = Conn.define('pokemon', {
  no: {
        primaryKey: true,
        type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  types: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  height: {
    type: Sequelize.STRING,
    allowNull: false
  },
  weight: {
    type: Sequelize.STRING,
    allowNull: false
  },
  evoline: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
});



const POKE_ARR = require('./dbinit');

Conn.sync({force: true}).then(() => {

  POKE_ARR.map((v, i)=>{

    return Pokemon.create({
      no: v.no,
      name: v.name,
      types: v.types,
      height: v.height,
      weight: v.weight,
      evoline: v.evoline
    });
  });

});






module.exports = Conn;
