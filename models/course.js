const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/formationnode')
        .then(() => console.log('mongo its here...'))
        .catch((error) => console.error(error.message));


const courseSchema = mongoose.Schema({
    title: String,
    price: Number,
    tags: [ {type: Schema.Types.ObjectId, ref: "Tag"} ],
    isPublished: Boolean,
    author: {type: Schema.Types.ObjectId, ref: "User"},
    image: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);

 