const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/formationnode')
        .then(() => console.log('mongo its here...'))
        .catch((error) => console.error(error.message));



const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: {type: String, unique: true},
    password: String,
    active: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);
