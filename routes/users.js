"use strict";

const express = require('express')
const router = express.Router()
const utils = require('../utils')



const dataquery =  function (req , res) {
    utils.executeQuery("SELECT lists.idList AS lists_idList, lists.title AS lists_title, lists.listcompleted AS lists_completed, Tasks.idTask AS Tasks_idTask, Tasks.title AS Tasks_title, Tasks.taskcompleted AS tasks_completed, SubTasks.idSubtask AS idSubtask, SubTasks.title AS SubTasks_title , Subtasks.sbcompleted as subtasks_completed\n" +
        "FROM lists LEFT JOIN POSSESS ON lists.idList = POSSESS.idList LEFT JOIN Tasks ON lists.idList = Tasks.idList LEFT JOIN SubTasks ON Tasks.idTask = SubTasks.idTask\n" +
        "WHERE POSSESS.idUser=$1;"
        , [req.params.id ],  function (result) {

            const test = utils.createDataPattern(result)

            res.json( { testdata : test})
        })
};

router.get('/:id([0-9])/data',dataquery)


router.post('/login', function (req, res) {
    const form = req.body
    utils.executeQuery("SELECT * FROM USERS WHERE username=$1 AND unsecured_password=$2;"
        , [form.login , form.password],  function (result) {

           if(result.rowCount > 0) {
               console.log('connected')
               const id = result.rows[0].iduser
                res.status(200).json({ id : id })



           }

           else {
               console.log('mauvais pass')
               res.status(500).json({ error: 'something blew up' });
           }
        })
})

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
