const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/formationnode')
        .then(() => console.log('mongo its here...'))
        .catch((error) => console.error(error.message));



const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    active: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);
