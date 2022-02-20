// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Action = require('./actions-model')

router.get('/',(req,res) =>{
    Action.get()
})

module.exports = router;