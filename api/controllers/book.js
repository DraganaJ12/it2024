import Book from "../models/Book.js";
import Subject from "../models/Subject.js";


export const addBook = async(req, res, next) => {
    try {
        const { date, subjectId, appointment, userId } = req.body;

        if (!date || !subjectId || !appointment || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const formatDate = new Date(date);
        if (isNaN(formatDate)) {
            return res.status(400).json({ message: "Invalid date format" });
        }
        formatDate.setUTCHours(0, 0, 0, 0);

        const newBook = new Book({
            date: formatDate,
            subjectId,
            appointment,
            userId
        });

        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    } catch (err) {
        console.error("Error saving book:", err);
        next(err);
    }
};


export const getBooks = async(req, res, next) => {
    //izvucemo 
    const { userId } = req.query;
    try {
        const books = await Book.findAll({
            where: { userId },
            include: {
                model: Subject,
                attributes: ['id', 'title', 'name', 'price']
            }
        });
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

export const getBook = async(req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: {
                model: Subject,
                attributes: ['title']
            }
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};