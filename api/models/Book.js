import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Subject from "./Subject.js";


const Book = sequelize.define("Book", {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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
    indexes: [{
        unique: true,
        fields: ['date', 'subjectId', 'userId', 'appointment']
    }]
});

Book.belongsTo(Subject, { foreignKey: 'subjectId' });


export default Book;