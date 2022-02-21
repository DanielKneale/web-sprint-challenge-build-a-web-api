// add middlewares here related to actions
const db = require("../../data/dbConfig")

const validateAction = async (req,res,next) => {
    const action = await db('actions').where('id',req.params.id).first()
    if(action){
        next()
    }else{
        res.status(404).json({message: 'action not found'})
        next()
    }
    return(action)
}

const checkReq = (req,res,next) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({message: 'name and description required '})
    }else{
        next()
    }
}

module.exports = {
    validateAction,
    checkReq
}