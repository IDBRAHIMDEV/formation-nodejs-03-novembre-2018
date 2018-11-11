const express = require('express');
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
   
    // const userSchema = {
    //     firstName: Joi.string().required(),
    //     lastName: Joi.string().required(),
    //     phone: Joi.string(),
    //     email: Joi.string()
    // };

    // const { error } = Joi.validate(req.body, userSchema);

    //   if(error) {
    //     return  res.status(400).send(error.details[0].message);
    //   }

    
      let myUser = new User();

      myUser.firstName = req.body.firstName;
      myUser.lastName = req.body.lastName;
      myUser.email = req.body.email;
      myUser.phone = req.body.phone;
      let password = await bcrypt.hash(req.body.password, 10);
      myUser.password = password;

      let result = await myUser.save();

    res.send(result)
})


route.post('/login', async (req, res) => {
   
     
    user = {
        email: req.body.email,
        password: req.body.password
    }

    let myUser = await User.findOne({ email: user.email });

    if(myUser) {
      bcrypt.compare(user.password, myUser.password, (err, val) => {
          if(!val) {
              return res.status(400).json({status: 0})
          }
          let token = jwt.sign({id: myUser._id}, 'lacheraimarrakech')
          res.status(201).json({status: 1, token: token})
      })
         
    }else {
        res.status(400).send('user not found');
    }


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