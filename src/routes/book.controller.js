const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { authAdmins } = require('../middleware/auth.middleware');
const router = new express.Router();
const BookService = require('../services/book.service');
const bookServices = new BookService();
const BookToUpdateDTO = require('../dtos/book-to-update-dto');
const BookToCreateDTO = require('../dtos/book-to-create-dto');
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

const upload = multer({
    // dest: 'book-images',// si fueramos a guardar las imagenes en el servidor esta seria la carpeta directoria
    limits: {
        fileSize: 1000000 // se expresa en bytes
    },
    fileFilter(req, file, cb) {

        if (file == null) {
            return cb(undefined, true);
        }

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Por favor suba una imagen de formato valida'));
        }

        //dejar pasar
        cb(undefined, true);
    }
});

// esto solo un admin podra hacerlo
router.post('/api-books/v1/books', authAdmins, async (req, res, next) => {
    try {
        const newBook = new BookToCreateDTO(req.body);
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

router.patch('/api-books/v1/books/upload-image/:id', authAdmins, upload.single('image'), async (req, res, next) => {/*upload.single() espera recibir el key que aparecera en el form-data en el body*/
    try {
        const id = req.params.id;
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer();

        const bookToUpdate = {
            _id: id,
            image: buffer,
        }
        const bookUpdated = await bookServices.update(bookToUpdate);
        return res.status(200).send(bookUpdated);
    } catch (error) {
        next(error);
    }
}, (error, req, res, next) => {
    return res.status(400).send({error: error.message});// aca capturamos el error que arrojamos en el fileFilter
})

// esto solo un admin podra hacerlo
router.patch('/api-books/v1/books', authAdmins, async (req, res, next) => {
    try {
        const bookToUpdate = req.body;
        const bookToUpdateDTO = new BookToUpdateDTO(bookToUpdate);
        const bookUpdated = await bookServices.update(bookToUpdateDTO);
        return res.status(200).send(bookUpdated);
    } catch (error) {
        next(error);
    }
});

module.exports = router;