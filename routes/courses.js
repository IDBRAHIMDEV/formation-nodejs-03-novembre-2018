const express = require('express')
const multer = require("multer");
//Models
const Course   = require("./../models/course");
const Joi      = require('joi');
const route = express.Router();


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "public/images/courses");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });
  

route.get('/', async (req, res) => {

    const myCourses = await Course.find();
    res.send(myCourses);
})

route.get('/:id',async (req, res) => {
    let id = req.params.id;
    const course = await Course.findById(id);
    // console.log(id);
    // let course =courses.find((course) => course.id === id);

    res.send(course);
})

route.post('/', multer({ storage: storage }).single("image"), async (req, res) => {
   
    // const courseSchema = {
    //     title: Joi.string().required().min(2).max(10),
    //     price: Joi.number().required(),
    // };

    // const { error } = Joi.validate(req.body, courseSchema);

    //   if(error) {
    //     return  res.status(400).send(error.details[0].message);
    //   }

     
      let myCourse = new Course();

      myCourse.title = req.body.title;
      myCourse.price = req.body.price;
      myCourse.tags = req.body.tags;
      myCourse.author = req.body.author;

      const url = req.protocol + "://" + req.get("host");
      myCourse.image = url + "/images/courses/" + req.file.filename;
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