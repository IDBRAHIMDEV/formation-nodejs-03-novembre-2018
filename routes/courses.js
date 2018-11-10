const express = require('express')
//Models
const Course   = require("./../models/course");
const Joi      = require('joi');
const route = express.Router();


route.get('/', async (req, res) => {

    const myCourses = await Course.find();
    res.render('course/index', {
        courses: myCourses,
        title: "salam les amis",
        message: "message comme contenu"
    });
})

route.get('/:id',async (req, res) => {
    let id = req.params.id;
    const course = await Course.findById(id);
    // console.log(id);
    // let course =courses.find((course) => course.id === id);

    res.send(course);
})

route.post('/',async (req, res) => {
   
    const courseSchema = {
        title: Joi.string().required().min(2).max(10),
        price: Joi.number().required()
    };

    const { error } = Joi.validate(req.body, courseSchema);

      if(error) {
        return  res.status(400).send(error.details[0].message);
      }

    
      let myCourse = new Course();

      myCourse.title = req.body.title;
      myCourse.price = req.body.price;
      myCourse.tags = req.body.tags;
      myCourse.author = req.body.author;
      myCourse.isPublished = req.body.isPublished;
      
      let result = await myCourse.save();

    res.send(result)
})

route.put('/:id',async (req, res) => {
    
    let id = req.params.id;
    let course = await Course.findOne({_id: id})
     
    course.title = req.body.title;
    course.price = req.body.price;
    course.tags = req.body.tags;
    course.author = req.body.author;
    course.isPublished = req.body.isPublished;

    res.send(course);

})

route.delete('/:id',async (req, res) => {
    
    let id = req.params.id;
    
    let result = await Course.deleteOne({_id: id})
    res.send(result);

})

module.exports = route;