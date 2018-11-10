const express = require('express');

const User   = require("../models/user");
const Joi      = require('joi');
const route = express.Router();


route.get('/',async (req, res) => {

    const users = await User.find();
    res.send(users);
})

route.get('/:id',async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);
    // console.log(id);
    // let course =courses.find((course) => course.id === id);

    res.send(user);
})

route.post('/',async (req, res) => {
   
    const userSchema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.string(),
        email: Joi.string()
    };

    const { error } = Joi.validate(req.body, userSchema);

      if(error) {
        return  res.status(400).send(error.details[0].message);
      }

    
      let myUser = new User();

      myUser.firstName = req.body.firstName;
      myUser.lastName = req.body.lastName;
      myUser.email = req.body.email;
      myUser.phone = req.body.phone;
      
      let result = await myUser.save();

    res.send(result)
})

route.put('/:id',async (req, res) => {
    
    let id = req.params.id;
    let users = await User.findOne({_id: id})
     
    users.firstName = req.body.firstName;
    users.lastName = req.body.lastName;
    users.phone = req.body.phone;
    users.email = req.body.email;

    res.send(users);

})

route.delete('/:id',async (req, res) => {
    
    let id = req.params.id;
    
    let result = await User.deleteOne({_id: id})
    res.send(result);

})


module.exports = route;