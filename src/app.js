const express = require('express');
const cors = require('cors');
const corsOptions = require('./utils/cors-options');
const mongoSanitize = require('express-mongo-sanitize');
require('./db/mongoose');

const handleErrors = require('./middleware/error.middleware');

const booksRouter = require('./routes/book.controller');
const userRouter = require('./routes/user.controller');
const orderRouter = require('./routes/order.controller');

const app = express();

//para reconocer json requests y limitamos que tan grandes seran los requests
app.use(express.json({ limit: '10mb' }));

app.use(cors(corsOptions));

// para mitigar inyecciones NoSQL
app.use(mongoSanitize({
    replaceWith: '_'
}));

app.use(booksRouter);
app.use(userRouter);
app.use(orderRouter);



// aqui creamos un middleware de errores global
app.use(handleErrors);

module.exports = app;