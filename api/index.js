const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

module.exports = app;

app.listen(3001);
