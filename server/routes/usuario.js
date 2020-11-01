const express = require('express')
const app = express()

//METODO PARA ESCRIPTAR DATOS CON UN HASH DE UNA SOLA VIA , ES DECIR
//QUE PRO AMS QUE RECONSTRUYAN LOS DATOS DE LA DB NO OBTENDRA LA CONTRASENIA CON npm i bcrypt
const bcrypt = require('bcrypt');

//es para updatear solamente lo que quiero le permito en el PUT
const _ = require('underscore');




//etso hacemos para maenjar el modelo del schema
const Usuario = require('../models/usuario');




app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0; //parametro opcional desde que pagina arranca, si no llega el param es 0
    desde = Number(desde); //comvierte un string a un numero

    let limite = req.query.limite || 3;
    limite = Number(limite);
    //devuelvo todos ingresando al schema Usuario y devuelvo todo con find
    // el primer parametros puede ser una funcion para realizar filtros
    //el segundo parametro string son  os campos que queremos devolver
    Usuario.find({ estado: true }, 'role estado google nombre email') //luego DE elegir la condicion ejecutamos con exec()
        .skip(desde)
        .limit(limite) //limita la cantidad de registros paginandolos
        .exec((err, usuarios) => { //mongoose recibe un err y en este caso unarreglo de usuario si lo encuentra
            if (err) {
                //el return es por si entra al error sale yd eja de ejecutar el js
                return res.status(400).json(({
                    ok: false,
                    err
                }));
            }

            //para contar la cantidad de registros
            //la condicion debe ser identica a la del find para que cuente lo msimo
            Usuario.count({ estado: true }, (err, conteo) => {
                //ahora loq ue queremos regresar
                res.json({
                    ok: true, //es devolver un 200 como convencion
                    usuarios, //devuelve el listadp
                    cuantos: conteo // devuelbe la cantidad de registros contados
                })
            })


        })
})

app.post('/usuario', function(req, res) {

    ///obtenemos toda la info del post
    let body = req.body;

    //instancio el objeto con el esquema
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //de esta manera emvias hash de uan solavia encriptada
        //es sync para que no haya callback ni promesas y que sea directo
        //priemr parametro el campo y luego el numerpo de veultas
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    ///grabarlo en la base de datos
    usuario.save((err, usuarioDB) => {
        if (err) {
            //el return es por si entra al error sale yd eja de ejecutar el js
            return res.status(400).json(({
                ok: false,
                err
            }));
        }
        //quita el dato del campo en la devolucion de los datos del servidor
        //usuarioDB.password = null;
        //para ni siquiera regressar el campo de algo se cambia en el schema

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//variable con los campos que se pueden modificar en el PUT
let camposModificacion = ['nombre', 'email', 'img', 'role', 'estado'];

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //let body = req.body;

    //underscore pones el objeto y como segundo argumento todas las propiedades validas
    let body = _.pick(req.body, camposModificacion)
        /*Usuario.findById(id,(err,usuarioDB)=>{
           usuario.save; 
        })*/

    //de esta forma evitas que se envieen campos del body pero no es generico es individual 
    //con UNDERSCORE.JS lo simplifica npm install underscore en object => pick
    /*delete body.password;
    delete body.google;
    */
    //NEW es un objeto de option que devuelve el nuevo objeto modificado
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            //el return es por si entra al error sale yd eja de ejecutar el js
            return res.status(400).json(({
                ok: false,
                err
            }));
        }


        res.json({
            ok: true,
            usuario: usuarioDB

        });
    })
})

/*
//tipo de eliminacion fisica del registro por id en URL
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id; //de esta manera caprutas eparamerto de la url
    //para eliminarllo usamos el schema
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            //el return es por si entra al error sale yd eja de ejecutar el js
            return res.status(400).json(({
                ok: false,
                err
            }));
        }


        //verificar que e ID existe
        if (!usuarioBorrado) {
            return res.status(400).json(({
                ok: false,
                err: {
                    message: `Usuario no encontrado`
                }
            }));
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado

        });
    })
})*/



app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    let body = _.pick(req.body, 'estado');

    /* if ({ estado: false }) {
         //el return es por si entra al error sale yd eja de ejecutar el js
         return res.status(400).json(({
             ok: false,
             err: {
                 message: `El usuario ya esta eliminado`
             }
         }));
     }*/
    let cambiaestado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, /*body*/ cambiaestado, { new: true, runValidators: true }, (err, deleteLogic) => {
        if (err) {
            //el return es por si entra al error sale yd eja de ejecutar el js
            return res.status(400).json(({
                ok: false,
                err
            }));
        }


        res.json({
            ok: true,
            usuario: deleteLogic

        });
    })

})

module.exports = app;