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




router.post('/addtask', function (req,res) {

        const form = req.body
    console.log('form : ',form)

    utils.executeQuery("INSERT INTO  TASKS (title,idlist,taskcompleted) VALUES ($1,$2,false);"
        ,[form.title,form.id ], function (result) {
           utils.executeQuery("SELECT idtask FROM TASKS WHERE idlist =$1 AND title=$2",
               [form.id,form.title],function(result){
               const id = result.rows[0].idtask
                    res.json({ id : id})
               })
        })
})


router.post('/addlist', function (req,res) {
        console.log(req.body)
        const form = req.body

    utils.executeQuery("INSERT INTO  LISTS (title,listcompleted) VALUES ($1,false);"
        ,[ form.title], function (result) {
            utils.executeQuery("SELECT idlist from LISTS WHERE title=$1 ;",
                [form.title] , function (result) {
                const id = result.rows[0].idlist
                    res.json( { id : id})
                    console.log('id for query:  '  ,id)
                    utils.executeQuery("INSERT INTO POSSESS (idlist,iduser) VALUES ($1,1);"
                    , [result.rows[0].idlist] , (result,id) => res.end())
                })

        })


})


router.delete('/delete/:id([0-9]*)', function ( req,res ) {
    utils.executeQuery("DELETE FROM LISTS WHERE idList=$1;",
        [req.params.id], function (result) {
            console.log('list  deleted')
            res.end()

        })
} )





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


