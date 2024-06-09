import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Book = sequelize.define("Book", {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    appointment: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
});

export default Book;