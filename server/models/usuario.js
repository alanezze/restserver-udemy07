//para configurar las validaciones y personalizarlas se instala npm i mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator'); //hay qeu configurar que campo queres configurar
//abajo del schema


//METODO PARA ESCRIPTAR DATOS CON UN HASH DE UNA SOLA VIA , ES DECIR
//QUE PRO AMS QUE RECONSTRUYAN LOS DATOS DE LA DB NO OBTENDRA LA CONTRASENIA CON npm i bcrypt


// este es el encargado de trabajar el modelo de datos
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
//crecion de objeto
let Schema = mongoose.Schema;

//variable de los roles que puedo mandar en el enum
let rolesValidos = {
    //sintaxis: valores y mensaje de error
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
};
//campos que tendra la coleccioin;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        //loq eu va entre corchetes es un msj si al condicion no se cumple
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        //para que solo sea un campo unico o clave
        unique: true,
        required: [true, 'El email es Obligatorio']

        //para configurar las validaciones y personalizarlas se instala npm i mongoose-unique-validator
    },
    password: {
        type: String,
        required: [true, 'El Password es Obligatorio']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        //con enum podemos poner un rango donde hay validaciones aceptadas, como tipos de roles
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//SIEMPRE toJSON se llama cuando queremos imprimir algo
usuarioSchema.methods.toJSON = function() { //no usar arrowFunction por que hay que usar el THIS
    let user = this; //toma lo que esta en user en ese momento
    let userObjet = user.toObject(); //obtiene toodos las propiedades y metodos
    delete userObjet.password;
    return userObjet;
}


//message es el mensaje de error y path lo agrega como mensaje al error mismo
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe der ser unico' });

//exportamos el moduli de mongoose y de damos un nombre en este caso usuario y tendra
//toda la config de usuarioSchema
module.exports = mongoose.model('Usuario', usuarioSchema);