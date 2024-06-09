import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Subject = sequelize.define("Subject", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photos: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    appointment: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

export default Subject;