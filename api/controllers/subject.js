import Subject from "../models/Subject.js";
import Book from "../models/Book.js";

import { Op } from "sequelize";


export const addSubject = async(req, res, next) => {
    // Convert comma-separated strings to JSON arrays
    const { appointment, photos, ...otherFields } = req.body;

    const formattedAppointment = appointment ? appointment.split(',') : [];
    const formattedPhotos = photos ? photos.split(',') : [];

    const newSubject = new Subject({
        ...otherFields,
        appointment: formattedAppointment,
        photos: formattedPhotos,
    });

    try {
        const savedSubject = await newSubject.save();
        res.status(200).json(savedSubject);
    } catch (err) {
        next(err);
    }
};

export const getSubjects = async (req, res, next) => {
    const { min = 1, max = 999, limit, ...others } = req.query;
    try {
        const subjects = await Subject.findAll({
            where: {
                ...others,
            },
            limit: parseInt(limit) || undefined,
        });

        // Transform the photos and appointment fields to be JSON parsed
        const transformedSubjects = subjects.map(subject => {
            // Ensure photos is parsed as JSON
            if (subject.photos && typeof subject.photos === 'string') {
                try {
                    subject.photos = JSON.parse(subject.photos);
                } catch (error) {
                    console.error('Error parsing photos field:', error);
                }
            }
            // Ensure appointment is parsed as JSON
            if (subject.appointment && typeof subject.appointment === 'string') {
                try {
                    subject.appointment = JSON.parse(subject.appointment);
                } catch (error) {
                    console.error('Error parsing appointment field:', error);
                }
            }
            return subject;
        });

        res.status(200).json(transformedSubjects);
    } catch (err) {
        next(err);
    }
};



export const getSubject = async (req, res, next) => {
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

        const books = await Book.findAll({
            where: {
                subjectId: subject.id,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            limit: parseInt(req.query.limit) || undefined,
        });

        // Parse photos and appointments fields
        let freeAppointments = subject.appointment;
        let photos = subject.photos;

        console.log('Initial appointments:', freeAppointments);
        console.log('Initial photos:', photos);

        if (typeof freeAppointments === 'string') {
            try {
                freeAppointments = JSON.parse(freeAppointments);
            } catch (error) {
                console.error('Error parsing appointment field:', error);
                freeAppointments = [];
            }
        }

        if (typeof photos === 'string') {
            try {
                photos = JSON.parse(photos);
            } catch (error) {
                console.error('Error parsing photos field:', error);
                photos = [];
            }
        }

        if (books && date) {
            books.forEach(book => {
                freeAppointments = freeAppointments.filter(appt => appt !== book.appointment);
            });
        }

        console.log('Filtered appointments:', freeAppointments);

        const response = {
            subject: {
                ...subject.toJSON(),
                photos,
            },
            freeAppointments: freeAppointments
        };

        res.status(200).json(response);
    } catch (err) {
        console.error("Error:", err);
        next(err);
    }
};