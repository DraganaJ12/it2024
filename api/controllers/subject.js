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
        const subjects = await Subject.findAll({
            where: {
                ...others,
            },
            limit: parseInt(limit) || undefined,
        });
        res.status(200).json(subjects);
    } catch (err) {
        next(err);
    }
};

export const getSubject = async(req, res, next) => {
    try {
        const subject = await Subject.findByPk(req.params.id);

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        const date = req.query.date;

        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);

        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        //formatira se date da bi se poklopio sa formatom u bazi

        const books = await Book.findAll({
            where: {
                subjectId: subject.id,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            limit: parseInt(req.query.limit) || undefined,
        });

        //izvuku se slobodni appointments
        console.log('Books found:', books);
        let freeAppointments = subject.appointment;
        console.log('Initial appointments:', freeAppointments);
        if (!Array.isArray(freeAppointments)) {
            freeAppointments = [];
        }
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
        console.error("Error:", err);
        next(err);
    }
};