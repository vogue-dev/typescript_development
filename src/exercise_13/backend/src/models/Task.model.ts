import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/config";
import { User } from "./User.model";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface TaskAttributes {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: Date;
    deadline?: Date | null;
    assigneeId?: number | null;
}

type TaskCreationAttributes = Optional<TaskAttributes, "id" | "createdAt">;

export class Task
    extends Model<TaskAttributes, TaskCreationAttributes>
    implements TaskAttributes
{
    declare id: number;
    declare title: string;
    declare description: string;
    declare status: TaskStatus;
    declare priority: TaskPriority;
    declare createdAt: Date;
    declare deadline: Date | null;
    declare assigneeId: number | null;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("todo", "in_progress", "done"),
            allowNull: false,
            defaultValue: "todo"
        },
        priority: {
            type: DataTypes.ENUM("low", "medium", "high"),
            allowNull: false,
            defaultValue: "medium"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: true
        },
        assigneeId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "tasks",
        timestamps: false
    }
);

User.hasMany(Task, {
    foreignKey: "assigneeId",
    as: "tasks"
});

Task.belongsTo(User, {
    foreignKey: "assigneeId",
    as: "assignee"
});
