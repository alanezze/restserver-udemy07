require('./config/config')

const express = require('express')

const mongoose = require('mongoose')





const app = express()
const port = process.env.PORT


const bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//de esta manera ikmportamos y usamos las rutas del usuario
app.use(require('./routes/usuario'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('base de datos ONLINE');
    })


app.listen(port, () => {
    console.log(`escuchando puerto ${port}`);
})