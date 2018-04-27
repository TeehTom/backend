"use strict";

const express = require('express');
const router = express.Router();
const utils = require('../utils');

// /list

router.get('/', function (req, res) {
        console.log(req)
    utils.executeQuery("SELECT * FROM LISTS;"
        , [],  function (result) {
            res.json( { lists : result.rows })
        })
});

router.get('/:id([0-9])',function (req,res) {
    utils.executeQuery("SELECT * FROM LISTS WHERE idList=$1;"
    , [req.params.id], function (result) {
        res.json( { list : result.rows})
        })
})


router.get('/:id([0-9])/tasks',function (req,res) {
    utils.executeQuery("SELECT * FROM TASKS WHERE idList=$1;"
        , [req.params.id], function (result) {
            res.json( { tasks : result.rows})
        })
})



/*router.post('/create', function (req,res) {
    utils.executeQuery("INSERT INTO PROJECT (title) VALUES "
})*/


module.exports = router;


