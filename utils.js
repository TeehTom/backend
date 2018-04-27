"use strict";
const { Client } = require('pg');


const conString = 'postgres://cssgtawn:-_-gCfTsbKEy4D9zNJZHIrMIzIRF85jP@elmer.db.elephantsql.com:5432/cssgtawn' ;
const utils = {};




utils.executeQuery = (sql, params, callback) => {
    const client = new Client({
        user: 'cssgtawn',
        host: 'elmer.db.elephantsql.com',
        database: 'cssgtawn',
        password: '-_-gCfTsbKEy4D9zNJZHIrMIzIRF85jP',
        port: 5432
    })
    // 1. Connection

    client.connect( function (err, client, done) {
        if(err) {
              console.error('error fetching client from pool', err)
        }
        // 2. Execute the query
        client.query(sql, params, function (err, result) {
        // 3. Close Connection




        if (err) {
            console.log(err)
        }
        else {
            // 4. Execute the callback(res)
            callback(result)
        }
    })
})
}





module.exports = utils


