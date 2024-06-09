import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Subject from "../models/Subject.js";
import Book from "../models/Book.js";

import { Op } from "sequelize";


export const addSubject = async(req, res, next) => {
    const newSubject = new Subject(req.body);

    try {
        const savedSubject = await newSubject.save();
        res.status(200).json(savedSubject);
    } catch (err) {
        next(err);
    }
};

export const getSubjects = async(req, res, next) => {
    const { min = 1, max = 999, limit, ...others } = req.query;
    try {
        const hotels = await Subject.findAll({
            where: {
                ...others,
                price: {
                    [Op.gt]: min,
                    [Op.lt]: max,
                },
            },
            limit: parseInt(limit) || undefined,
        });
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};

export const getSubject = async(req, res, next) => {
    try {

        // console.log(body);
        const subject = await Subject.findByPk(req.params.id);

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        const id = subject.id;
        // const date = req.body.date;
        const date = "2024-05-31";

        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);

        console.log(startDate)
        console.log(endDate)

        const books = await Book.findAll({
            where: {
                subjectId: id,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            limit: parseInt(req.query.limit) || undefined,
        });

        console.log('Books found:', books);

        // Initialize freeAppointments with the original appointments
        let freeAppointments = subject.appointment;

        console.log('Initial appointments:', freeAppointments);

        // Ensure appointments is an array
        if (!Array.isArray(freeAppointments)) {
            freeAppointments = [];
        }

        // Iterate through each book and remove the corresponding appointment from freeAppointments
        if (books && date) {
            books.forEach(book => {
                freeAppointments = freeAppointments.filter(appt => appt !== book.appointment);
            });
        }

        console.log('Filtered appointments:', freeAppointments);

        const response = {
            subject,
            freeAppointments
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};