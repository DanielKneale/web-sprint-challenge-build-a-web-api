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
    .catch(e =>{
        res.status(500).json({message: 'error getting project'})
    })
}) 

router.post('/',checkReq, (req,res)=>{
    const newPro = req.body
    Project.insert(newPro)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(e => {
        res.status(500).json({message: "server side error"})
    })
})

router.put('/:id',validateProject,checkReq,trueOrFlase, async (req,res)=>{
    try{
        const data = await Project.update(req.params.id, req.body) 
        res.status(200).json(data)
    } catch(e) {
        res.status(500).json({message: "server error"})
    }
})


router.delete('/api/projects/:id',validateProject, async (req,res)=>{
    try{
        const data = await Project.remove(req.params.id) 
        res.status(200).json(data)
    } catch(e) {
        res.status(500).json(e,{message: "server error"})
    }
})


module.exports = router;