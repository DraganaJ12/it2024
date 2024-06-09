import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import subjectRoute from "./routes/subject.js";
import bookRoute from "./routes/book.js";


import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();


const connect = async() => {
    try {
        await sequelize.authenticate();
        console.log("Connected to MySQL database.");
        // await sequelize.sync(); // Synchronize models with database

    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/book", bookRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
});