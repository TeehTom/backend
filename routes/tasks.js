"use strict";

const express = require('express')
const router = express.Router()
const utils = require('../utils')


router.delete('/delete/:id([0-9]*)', function ( req,res ) {
    utils.executeQuery("DELETE FROM TASKS WHERE idtask=$1;",
        [req.params.id], function (result) {
            console.log('task  deleted')
            res.end()
        })
} )

router.get('/:id([0-9])', function (req, res) {
    utils.executeQuery("SELECT  DISTINCT Idtask , title FROM TASKS  WHERE IdTask=$1;"
        , [req.params.id],  function (result) {
            res.json( { tasks : result.rows })
        })
})

router.get('/:id([0-9])/subtasks', function (req, res) {
    utils.executeQuery("SELECT  DISTINCT IdSubtask , title FROM SUBTASKS  WHERE IdTask=$1;"
        , [req.params.id],  function (result) {
            res.json( { subtasks : result.rows })
        })
})

router.post('/:id([0-9]*)/addsubtask',function (req,res) {
    const form = req.body
    const id = req.params.id
    utils.executeQuery("INSERT INTO SUBTASKS (title,idtask,sbcompleted) VALUES ($1,$2,false);",
        [form.title,req.params.id] ,function (result)  {
        utils.executeQuery("SELECT * FROM SUBTASKS WHERE title=$1 AND idtask=$2;"
        , [ form.title , id] , function (result) {
            console.log(result.rows[0])
            res.json({ id : result.rows[0].idsubtask})
            })
    })
})





module.exports = router