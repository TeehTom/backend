"use strict";
const { Client } = require('pg');


const conString = 'postgres://cssgtawn:-_-gCfTsbKEy4D9zNJZHIrMIzIRF85jP@elmer.db.elephantsql.com:5432/cssgtawn' ;
const utils = {};
const pg = require('pg')








utils.executeQuery = (sql, params, callback ) => {
    const client = new Client({
        user: 'cssgtawn',
        host: 'elmer.db.elephantsql.com',
        database: 'cssgtawn',
        password: '-_-gCfTsbKEy4D9zNJZHIrMIzIRF85jP',
        port: 5432
    })
    // 1. Connection

    client.connect( function (err, client) {
        if(err) {
              console.error('error fetching client from pool', err)
            return
        }
        // 2. Execute the query
        client.query(sql, params, function (err, result) {





        if (err) {
            console.log(err)
        }
        else {
            // 4. Execute the callback(res)
            callback(result)
        }
        client.end()
    })

})
}

utils.createDataPattern = (object) => {


    const data = object.rows.map(element => {
     return   {          id : element.lists_idlist,
                         title : element.lists_title,
                         completed : element.lists_completed,
                         tasks : [{ id : element.tasks_idtask,
                                    title : element.tasks_title,
                                    completed : element.tasks_completed,
                                    subtasks : [ { id : element.subtasks_idsubtask ,
                                                   title : element.subtasks_title,
                                                   completed : element.subtasks_completed }]
     }]
     }

    })

    let data2 = []


        for(let i = 0 ; i < data.length;i++ )  {
             for(let j = i+1 ; j < data.length; j++) {
                 if( data[i] && data[j] && data[i].id===data[j].id  && data[j] !== data[i] ) {
                     data[i].tasks.push(data[j].tasks[0])
                     data[j] = null


                 }
             }
         }

    const test = data.filter(Boolean)
   test.forEach( element => {
       if( element.tasks) {
           element.tasks=cleaner(element.tasks)
       }

       if( element.tasks && !element.tasks[0].id) {
          element.tasks = null;

       }
   })





    return test
}

function cleaner(tasks) {
    for(let i = 0 ; i < tasks.length ; i++) {
        for(let j = i+1 ; j < tasks.length; j++) {
            if(tasks[i] && tasks[j] && tasks [i].id===tasks[j].id  && tasks[j] !== tasks[i]) {
                tasks[i].subtasks.push(tasks[j].subtasks[0])
                tasks[j] = null
             }




            }
        }
        if(tasks.subtasks) {
            tasks.subtasks.forEach(e => {
                if(e.id === null || e.title===null){
                e = null
                console.log('clean')
               }
        })
            tasks.subtasks.filter(Boolean)
        }

        const cleanTasks = tasks.filter(Boolean);
    return cleanTasks
}



module.exports = utils


