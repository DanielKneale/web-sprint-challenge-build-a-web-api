// add middlewares here related to projects

const db = require('../../data/dbConfig')

const validateProject = async (req,res,next) => {
    const project = await db('projects').where('id',req.params.id).first()
    if(project){
        next()
    }else{
        res.status(404).json({message: 'project not found'})
        next()
    }
    return(project)
}

const checkReq = (req,res,next) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({message: 'name and description required '})
    }else{
        next()
    }
}

const trueOrFlase = (req,res,next) => {
    if(!req.body.completed){
        res.status(400).json({message: 'check project completion'})
    }else{
        next()
    }
}

module.exports = {
    validateProject,
    checkReq,
    trueOrFlase
}