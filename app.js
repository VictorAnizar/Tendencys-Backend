const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Se indican qué respuestas del backend pueden ser compartidas a alguna peticion de un determinado origen
app.use(
    function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        next();
        
    }
)

//Configuración de la BD
const mongoose = require('mongoose');

// Conectarse a la base de datos mediante la URI
mongoose.connect(process.env.MONGO_URI);

// Entrar en modo depurador en mongoose.
mongoose.set("debug", true);

// usamos los modelos Aplications, Authorizations y Logs
require('./models/Application')
require('./models/Authorization')
require('./models/Log')
require('./models/User')


app.use('/api', require('./routes/main.routes'));


//  activar servidor backend en el puerto definido
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}!`);
});


module.exports = app;
