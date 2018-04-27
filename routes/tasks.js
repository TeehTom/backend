"use strict";

const express = require('express')
const router = express.Router()
const utils = require('../utils')




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



module.exports = router