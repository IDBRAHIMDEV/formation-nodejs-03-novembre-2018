const express  = require('express');
const Joi      = require('joi');

const app = express();
app.use(express.json());





const port = 3000;
app.listen(port, () => console.log('server is running...'));
