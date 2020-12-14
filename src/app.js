const express = require('express');
require('./db/mongoose');

const handleErrors = require('./middleware/error.middleware');

const app = express();

//para reconocer json requests
app.use(express.json());

// aqui creamos un middleware de errores global
app.use(handleErrors);

module.exports = app;