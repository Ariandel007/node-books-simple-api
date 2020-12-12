const express = require('express');
require('./db/mongoose');

const app = express();

//para reconocer json requests
app.use(express.json());

module.exports = app;