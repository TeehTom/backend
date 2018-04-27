"use strict";

const express = require('express')
const router = express.Router()
const utils = require('../utils')



const dataquery =  function (req , res) {
    utils.executeQuery("SELECT lists.idList AS lists_idList, lists.title AS lists_title, Tasks.idTask AS Tasks_idTask, Tasks.title AS Tasks_title, SubTasks.idSubtask, SubTasks.title AS SubTasks_title\n" +
        "FROM lists LEFT JOIN POSSESS ON lists.idList = POSSESS.idList LEFT JOIN Tasks ON lists.idList = Tasks.idList LEFT JOIN SubTasks ON Tasks.idTask = SubTasks.idTask\n" +
        "WHERE POSSESS.idUser=$1;"
        , [req.params.id ],  function (result) {
            console.log(typeof result)
            console.log(result.rows[0].lists_idlist)
            res.json( { test : result.rows})
        })
};

router.get('/:id([0-9])/data',dataquery)


  router.get('/:id([0-9])', function (req, res) {
    utils.executeQuery("SELECT * FROM USERS WHERE idUser=$1;"
        , [req.params.id ],  function (result) {
            res.json( { users : result.rows })
        })
})


 router.get('/:id([0-9])/lists',  function (req,res)  {
     utils.executeQuery("SELECT DISTINCT LISTS.idList,title FROM LISTS , POSSESS WHERE idUser=$1;"
         , [req.params.id ],  function (result) {
             res.json( { lists : result.rows })
         })

})




/*data : [ { id : 1,
            title : 'l1'
            tasks: [ { id : 1 , title : t1  , subtasks:[]}]
}
,  {
        data : [ { id : 2,
            title : 'l2'
            tasks: []}]*/





module.exports = router
