//================================
//  PUERTO 
//================================
//process es un objeto global que corre siempore en la app de node 
process.env.PORT = process.env.PORT || 3000;
let a;

//================================
//  ENTORNO 
//================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';




//================================
//  BASE DE DATOS
//================================
let urlDB;


if (process.env.NODE_ENV = 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://alan:Alan12345678@cluster0.ljjrg.mongodb.net/cafe';
}

process.env.URLDB = urlDB;