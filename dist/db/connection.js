"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("ts_node", "root", "", {
    host: "localhost",
    dialect: "mysql",
    // logging: false
});
exports.default = db;
// NOTE - https://sequelize.org/docs/v6/getting-started/
//# sourceMappingURL=connection.js.map