require('dotenv').config({ path: './environment/db.env' }); // carrega as variáveis

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa os modelos
db.Artista = require('./Artista')(sequelize, DataTypes);

module.exports = db;
