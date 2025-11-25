"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../db/config");
const User_model_1 = require("./User.model");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("todo", "in_progress", "done"),
        allowNull: false,
        defaultValue: "todo"
    },
    priority: {
        type: sequelize_1.DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
        defaultValue: "medium"
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    assigneeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: config_1.sequelize,
    tableName: "tasks",
    timestamps: false
});
User_model_1.User.hasMany(Task, {
    foreignKey: "assigneeId",
    as: "tasks"
});
Task.belongsTo(User_model_1.User, {
    foreignKey: "assigneeId",
    as: "assignee"
});
