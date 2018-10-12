const express = require('express');
const _ = require('lodash');

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
        Model.create(object)
            .then( obj => res.status(200).json(obj))
            .catch(e => next(e))
    })
    
    
    
    // CRUD: UPDATE
     router.post('/:id',(req,res,next) => {
        const {id} = req.params;
        const {data} = req.body;
        console.log(data);
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
