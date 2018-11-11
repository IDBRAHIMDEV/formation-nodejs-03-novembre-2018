const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/formationnode')
        .then(() => console.log('mongo its here...'))
        .catch((error) => console.error(error.message));



const tagSchema = mongoose.Schema({
    label: String
});

module.exports = mongoose.model('Tag', tagSchema);
