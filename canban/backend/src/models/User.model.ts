import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/config";

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    declare id: number;
    declare name: string;
    declare email: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false
    }
);
