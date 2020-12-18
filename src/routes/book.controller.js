const express = require('express');
const { authAdmins } = require('../middleware/auth.middleware');
const router = new express.Router();
const BookService = require('../services/book.service');
const bookServices = new BookService();
const BookToUpdateDTO = require('../dtos/book-to-update-dto');
const QueryStringListBooksDto = require('../dtos/query-string-list-books-dto');

router.get('/api-books/v1/books', async (req, res, next) => {
    try {
        const queryBooks = new QueryStringListBooksDto(req.query);
        const books = await bookServices.getAllBooks(queryBooks);
        return res.status(200).send(books);
    } catch(error) {
        next(error);
    }
});

router.get('/api-books/v1/books/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const filter = {
            id: id
        };
        const book = await bookServices.getOneBook(filter);
        return res.status(200).send(book);

    } catch(error) {
        next(error);
    }
});


// esto solo un admin podra hacerlo
router.post('/api-books/v1/books', authAdmins, async (req, res, next) => {
    try {
        const newBook = req.body;
        const bookCreated = await bookServices.create(newBook);
        return res.status(201).send(bookCreated);

    } catch(error) {
        next(error);
    }
});

// esto solo un admin podra hacerlo
router.delete('/api-books/v1/books/:id', authAdmins, async (req, res, next) => {
    try {
        const id = req.params.id;
        await bookServices.deleteById(id);
        return req.status(204).send();
    } catch (error) {
        next(error);
    }
});

// esto solo un admin podra hacerlo
router.patch('/api-books/v1/books/:id', authAdmins, async (req, res, next) => {
    try {
        const id = req.params.id;
        const taskToUpdate = req.body;
        const taskUpdateDTO = new BookToUpdateDTO(taskToUpdate);
        task['_id'] = id;
        const taskUpdated = await bookServices.update(taskUpdateDTO);
        return res.status(200).send(taskUpdated);
    } catch (error) {
        next(error);
    }
});

module.exports = router;