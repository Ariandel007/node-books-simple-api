const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
require('./db/mongoose');

const handleErrors = require('./middleware/error.middleware');

const booksRouter = require('./routes/book.controller');
const userRouter = require('./routes/user.controller');

const app = express();

//para reconocer json requests
app.use(express.json());
// para mitigar inyecciones NoSQL
app.use(mongoSanitize({
    replaceWith: '_'
}));

app.use(booksRouter);
app.use(userRouter);


// aqui creamos un middleware de errores global
app.use(handleErrors);

module.exports = app;