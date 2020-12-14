const express = require('express');
const router = new express.Router();
const BookService = require('../services/book.service');

const bookServices = new BookService();

router.get('api-books/v1/books', async (req, res, next) => {
    try {
        const books = await bookServices.getAllBooks();
        return res.status(200).send(books);
    } catch(error) {
        next(error);
    }
});

router.post('api-books/v1/books', async (req, res, next) => {
    try {
        const newBook = req.body;
        const bookCreated = await bookServices.create(newBook);

        return res.status(201).send(bookCreated);
    } catch(error) {
        next(error);
    }
});