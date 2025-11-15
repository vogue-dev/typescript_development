import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    database: process.env.DB_NAME || "tasks_db",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "",
    logging: false
});
