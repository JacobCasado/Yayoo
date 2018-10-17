const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Images = require('../models/Images');
const uploadCloud = require('../configs/cloudinary.js');

router.get('/', (req, res, next) => {
    return Images.find()
    .populate('user')
    .then(data => {console.log(data); return res.status(200).json(data)})
    .catch(err => next(err));
})

//CREATE NEW IMAGE
router.post('/', uploadCloud.single('image'), (req, res, next) => {
    let {description} = req.body;
    let image = req.file.secure_url
    console.log("NEW IMAGE ENTERS");
    
    return new Images({
        user: req.user._id,
        description,
        image
    }).save()
        .then((response) => {
            console.log(response);
            User.findByIdAndUpdate(req.user._id, { $push: { photos: response._id } })
            .then((user) => { res.status(200).json(user) })
        }).catch(e => next(e))
})

module.exports = router;