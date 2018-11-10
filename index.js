const express  = require('express');
const app      = express();

app.set('view engine', 'ejs');
app.set('views', './views');

//routes
const courses = require('./routes/courses')
const users   = require('./routes/users')


app.use(express.json());
app.use('/api/courses', courses);
app.use('/api/users', users);


const port = 3000;
app.listen(port, () => console.log('server is running...'));
