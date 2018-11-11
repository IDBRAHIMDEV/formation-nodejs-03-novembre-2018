const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/formationnode')
        .then(() => console.log('mongo its here...'))
        .catch((error) => console.error(error.message));


const courseSchema = mongoose.Schema({
    title: String,
    price: Number,
    tags: [ String ],
    isPublished: Boolean,
    author: String,
    image: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);

 