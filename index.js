const express  = require('express');
const cors     = require('cors');
const app      = express();

// app.set('view engine', 'ejs');
// app.set('views', './views');

//routes
const courses = require('./routes/courses')
const users   = require('./routes/users')
const tags    = require('./routes/tags')
// app.use((req, res, next) => {
//     console.log('je suis le middleware 1');

//     if(false) {
//         res.render('page-en-construction')
//     }else {
//         next();
//     }
   
    
// })


app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/api/courses', courses);
app.use('/api/users', users);
app.use('/api/tags', tags);

const port = 3000;
app.listen(port, () => console.log('server is running...'));
