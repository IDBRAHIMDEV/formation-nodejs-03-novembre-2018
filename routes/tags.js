const express = require('express')
const Joi     = require('joi');
//Models
const Tag   = require("./../models/tag");
const route = express.Router();


route.get('/',async (req, res) => {

    const tags = await Tag.find();
    res.send(tags);
})

route.get('/:id',async (req, res) => {
    let id = req.params.id;
    const tag = await Tag.findById(id);
    // console.log(id);
    // let course =courses.find((course) => course.id === id);

    res.send(tag);
})

route.post('/',async (req, res) => {
   
    const tagSchema = {
        label: Joi.string()
    };

    const { error } = Joi.validate(req.body, tagSchema);

      if(error) {
        return  res.status(400).send(error.details[0].message);
      }

    
      let myTag = new Tag();
      myTag.label = req.body.label;
      let result = await myTag.save();

    res.send(result)
})


module.exports = route;