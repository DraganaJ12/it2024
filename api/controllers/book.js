import Book from "../models/Book.js";
import { Op } from "sequelize";


export const addBook = async(req, res, next) => {
    const newBook = new Book(req.body);

    try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    } catch (err) {
        next(err);
    }
};

export const getBooks = async(req, res, next) => {
    const { min = 1, max = 999, limit, ...others } = req.query;
    try {
        const books = await Book.findAll({
            where: {
                ...others
            },
            limit: parseInt(limit) || undefined,
        });
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

export const getBook = async(req, res, next) => {
    try {
        const Book = await Book.findByPk(req.params.id);

        const id = Book.id;

        if (!Book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(Book);
    } catch (err) {
        next(err);
    }
};