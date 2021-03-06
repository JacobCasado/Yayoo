const express = require('express');
const _ = require('lodash');

const uploadCloud = require('../configs/cloudinary.js');

const simpleCrud = (Model, extensionFn) => {
    let router  = express.Router();

    // Detect paths from model
    let notUsedPaths = ['_id','updated_at','created_at','__v'];
    let paths = Object.keys(Model.schema.paths).filter(e => !notUsedPaths.includes(e));
    
    if(extensionFn){
        router = extensionFn(router);
    }
    // CRUD: RETRIEVE
    router.get('/',(req,res,next) => {
        const object = _.pickBy(req.body.data, (e,k) => paths.includes(k));
        Model.find(object)
            .then( objList => res.status(200).json(objList))
            .catch(e => next(e))
    })
    
    // CRUD: CREATE
    router.post('/',(req,res,next) => {
        const object = _.pickBy(req.body.data, (e,k) => paths.includes(k));
        object.location = {
            coordinates: [req.body.data.lat, req.body.data.lng]
        }
        Model.create(object)
            .then( obj => res.status(200).json(obj))
            .catch(e => next(e))
    })
    
    // CRUD: UPDATE
     router.post('/:id',uploadCloud.single('image'),(req,res,next) => {
         console.log(req.body);
        const {id} = req.params;
        const {username,description,gender,location,telephone} = req.body;
        const image = req.file.secure_url;
        const data = {username,description,gender,location,telephone,image}
        Model.findByIdAndUpdate(id, data ,{new:true})
            .then( obj => {
                return res.status(200).json(obj);
            })
            .catch(e => { next(e)})
    })
    
    // CRUD: DELETE
    router.delete('/:id',(req,res,next) => {
        const {id} = req.params;
        Model.findByIdAndRemove(id)
            .then( obj => {
                if(obj){
                    res.status(200).json({status:`Removed from db`});
                }else{
                    throw new Error("Not existing ID");
                }
            })
            .catch(e => next(e))
    })
    
    router.use((err,req,res,next) => {
        res.status(500).json({error:true, message:err.message});
    })

    return router;
}


module.exports = simpleCrud;
