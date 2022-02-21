// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const {validateProject, checkReq, trueOrFlase} = require('./projects-middleware')

// get,
// insert,
// update,
// remove,
// getProjectActions,

const Project = require('./projects-model')

router.get('/',(req,res) =>{
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(e => {
            res.status(500).json(e, {message: ' error retrieving project'})
        })
})

router.get('/:id',validateProject, (req,res) =>{
    Project.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(e => {
        res.status(500).json({message:"server error"})
    })
}) 

router.post('/',checkReq, async (req,res)=>{
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    
})

router.put('/:id',validateProject,checkReq,trueOrFlase, async (req,res)=>{
    try{
        await Project.update(req.params.id, req.body) 
        const updatedProj = await Project.get(req.params.id)
        res.status(200).json(updatedProj)
    } catch(e) {
        res.status(500).json({message: "server error"})
    }
})


router.delete('/:id',validateProject, async (req,res)=>{
    try{
        const delProject = await Project.get(req.params.id)
        await Project.remove(req.params.id) 
        res.status(200).json(delProject)
    } catch(e) {
        res.status(500).json({message: "server error"})
    }
})

router.get('/:id/actions/',(req,res)=>{
    Project.getProjectActions(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(e => {
        res.status(500).json({message:"server error"})
    })
})


module.exports = router;