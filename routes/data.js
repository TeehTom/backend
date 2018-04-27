"use strict";

const express = require('express')
const router = express.Router()
const utils = require('../utils')


router.get('/:id([0-9]*)/data', function (req, res) {
    const data = [];
    utils.executeQuery("SELECT  DISTINCT Lists.IdList , title FROM LISTS , POSSESS WHERE Iduser=$1;"
        , [req.params.id])
        .then()
        })
})

module.exports = router