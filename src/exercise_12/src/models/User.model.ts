import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/config.js";

export class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { sequelize, modelName: "User" }
);
