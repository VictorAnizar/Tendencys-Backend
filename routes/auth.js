// Se utiliza el módulo express-jwt ya que provee un middleware para express para validar JWTs a traves del modulo JWT 
const { expressjwt: expressJwt } = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeader(req) {
	if (req.headers.authorization && (req.headers.authorization.split(' ')[0] === 'Token' ||req.headers.authorization.split(' ')[0] === 'Bearer')){
		return req.headers.authorization.split(' ')[1];
	}
	return null
}

const auth = {
  requerido: expressJwt({
    secret: secret,  // La palabra secreta
    algorithms: ['HS256'], // El algoritmo de cifrado
    userProperty: 'usuario', // Con este atributo veremos el playload mediante req.usuario
    credentialsRequired: true,  // Si es verdadero, requiere de credenciales, si no, pasa al siguiente middleware
    getToken: getTokenFromHeader //Funcion que recibe la peticion y revuelve el token
  }),
  opcional: expressJwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'usuario',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;


