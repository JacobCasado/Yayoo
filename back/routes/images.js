const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Images = require('../models/Images');
//const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.js');


//CREATE NEW IMAGE
router.post('/new', uploadCloud.single('image'), (req, res, next) => {
    console.log("NEW IMAGE ENTERS");
    
    let itemOwner = req.user._id
    let {description} = req.body;
    let image = req.file.secure_url

    return new Images({
        username: req.user.username,
        itemOwner,
        description,
        image
    }).save()
        .then((response) => {
            console.log(response);
            User.findByIdAndUpdate(req.user._id, { $push: { items: response._id } })
            .then((user) => { res.json(user) })
        }).catch(e => next(e))
})

module.exports = router;