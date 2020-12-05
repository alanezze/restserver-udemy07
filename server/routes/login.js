const express = require('express')
const app = express()
    //METODO PARA ESCRIPTAR DATOS CON UN HASH DE UNA SOLA VIA , ES DECIR
    //QUE PRO AMS QUE RECONSTRUYAN LOS DATOS DE LA DB NO OBTENDRA LA CONTRASENIA CON npm i bcrypt
const bcrypt = require('bcrypt');
//etso hacemos para maenjar el modelo del schema
const Usuario = require('../models/usuario');

app.post('/login', (req, res) => {
    ok: true
})




module.exports = app