const express = require('express');
require('./db/mongoose');

const handleErrors = require('./middleware/error.middleware');

const booksRouter = require('./routes/book.controller');

const app = express();

//para reconocer json requests
app.use(express.json());

app.use(booksRouter);

// aqui creamos un middleware de errores global
app.use(handleErrors);

module.exports = app;