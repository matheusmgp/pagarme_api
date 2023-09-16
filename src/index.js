require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;
