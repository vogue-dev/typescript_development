import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/config.js";
import { User } from "./User.model.js";

export class Task extends Model {}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING },
        status: {
            type: DataTypes.ENUM("todo", "in_progress", "done"),
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM("low", "medium", "high"),
            allowNull: false
        },
        deadline: { type: DataTypes.DATE, allowNull: true }
    },
    { sequelize, modelName: "Task" }
);

// Relations
Task.belongsTo(User, { foreignKey: "assigneeId" });
User.hasMany(Task, { foreignKey: "assigneeId" });
