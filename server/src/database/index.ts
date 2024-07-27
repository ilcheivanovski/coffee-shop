import { Dialect, Sequelize } from 'sequelize';

const sequelize = new Sequelize('coffeeShopDb', process.env.DB_USERNAME || 'postgres', process.env.DB_PASSWORD || 'admin', {
  database: process.env.DB_DATABASE || 'coffeeShopDb',
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_CONNECTION as Dialect || 'postgres',
});

export default sequelize