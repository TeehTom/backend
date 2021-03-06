"use strict";

const express = require('express')
const router = express.Router()
const utils = require('../utils')


router.get('/:id([0-9])', function (req, res) {
    utils.executeQuery("SELECT  DISTINCT IdSubtask , title FROM SUBTASKS  WHERE Idtask=$1;"
        , [req.params.id],  function (result) {
            res.json( { subtasks : result.rows })
        })
})


router.delete('/delete/:id([0-9]*)', function ( req,res ) {
    utils.executeQuery("DELETE FROM SUBTASKS WHERE idsubtask=$1;",
        [req.params.id], function (result) {
            console.log('subtask  deleted')
            res.end()

        })
} )

module.exports = router