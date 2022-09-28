import { Sequelize } from "sequelize";

const db = new Sequelize("ts_node", "root", "", {
   host: "localhost",
   dialect: "mysql",
   // logging: false
});

export default db;

// NOTE - https://sequelize.org/docs/v6/getting-started/
