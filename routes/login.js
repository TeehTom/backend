"use strict";

const express = require('express')


const router = express.Router();

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', function (req,res) {



})
// SI "OK", CREER UN COOKIE POUR SAUVEGARDER L'ID
if (userFound) {
    req.session.userId = userFound.id
    req.session.username = userFound.username
    res.locals.username = userFound.username
    result = `User + pass correct :)`
}
else {
    result = 'Mauvais user/pass :('
}
res.render('login', { info: result })
})

router.get('/logout', (req, res) => {
    req.session = null
res.redirect('/')
})

module.exports = router