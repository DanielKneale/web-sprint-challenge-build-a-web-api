// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Action = require('./actions-model')
const {validateAction,checkReq} = require('./actions-middlware')

router.get('/',(req,res) =>{
    Action.get()
    .then(actions => {
        res.status(200).json(actions)
    })
})

router.get('/:id',validateAction, (req,res) =>{
    Action.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(e =>{
        res.status(500).json({message: 'error getting project'})
    })
}) 

router.post('/',checkReq, (req,res)=>{
    const newAct = req.body
    Action.insert(newAct)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(e => {
        res.status(500).json(e,{message: "server side error"})
    })
})

// router.put('/:id',validateProject,checkReq,trueOrFlase, async (req,res)=>{
//     try{
//         const data = await Action.update(req.params.id, req.body) 
//         res.status(200).json(data)
//     } catch(e) {
//         res.status(500).json({message: "server error"})
//     }
// })


// router.delete('/:id',validateProject, async (req,res)=>{
//     try{
//         const data = await Action.remove(req.params.id) 
//         res.status(200).json(data)
//     } catch(e) {
//         res.status(500).json(e,{message: "server error"})
//     }
// })


module.exports = router;