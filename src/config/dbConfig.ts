import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://admin:My0pS6qNeIVErA6CFdVZnvMk1kyScqht@dpg-cn49enicn0vc738rkev0-a.oregon-postgres.render.com/bitespeed_wl13', {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true
    }
  }
});

sequelize.sync().then(() => {
  console.log('db and tables have been created')
})
