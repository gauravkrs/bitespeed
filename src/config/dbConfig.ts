import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('bitespeed', 'root', 'pass1234', {
    host: 'localhost',
    dialect: 'mysql',
  });

  sequelize.sync().then(() => {
    console.log('db and tables have been created')
  })
  