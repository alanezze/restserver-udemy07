//va al principio para configurar los puertos y el process  apenas inicie server.js
require('./config/config');

const express = require('express')

const mongoose = require('mongoose')





const app = express()


const bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())
let a;

//de esta manera ikmportamos y usamos las rutas del usuario
app.use(require('./routes/usuario'));
app.use(require('./routes/login'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, },
    (err, res) => {
        if (err) throw err;
        console.log('base de datos ONLINE');
    })


app.listen(process.env.PORT, () => {
    console.log('escuchando puerto ', process.env.PORT);
})