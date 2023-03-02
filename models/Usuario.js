
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;


const UserScheme = new mongoose.Schema({
  name: { type: String, required: true },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: [/^[a-z0-9]+$/, "Username not valid"],
    index: true
  },
  password: { type: String, required: true },

  hash: String,
  salt: String
}, { collection: "Users", timestamps: true });



UserScheme.plugin(uniqueValidator, { message: "Already exists" })


UserScheme.methods.crearPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString("hex")
}

UserScheme.methods.validarPassword = function (password) {
  const newHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return this.hash === newHash
}

UserScheme.methods.generaJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    usuario: this.usuario,
    exp: parseInt(exp.getTime() / 1000),
  }, secret)
}

UserScheme.methods.toAuthJSON = function () {
  return {
    id: this.id,
    name: this.name,
    username: this.username,
    token: this.generaJWT()
  }
}

UsuarioScheme.methods.onlyPublicData = function (userFind) {
  return {

    id: userFind.id,
    name: userFind.nombre,
    username: userFind.username,
    
  }
}


UsuarioScheme.methods.onlyPublicDataall = function (userFind) {
  var roots = userFind.map(
    function (usuario) {
      return {

        id: usuario.id,
        name: usuario.name,
        username: usuario.username,
       
      }
    });
  return roots
}

mongoose.model("User", UsuarioScheme);