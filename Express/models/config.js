import { Sequelize, DataTypes } from 'sequelize';
import { v1 as uuidv1 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

export {
    sequelize,
    DataTypes,
    uuidv1
}