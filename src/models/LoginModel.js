const { fround } = require('core-js/fn/math');
const mongoose = require('mongoose');
const validator = require('validator');
const { register } = require('../controllers/loginController');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor (body){
    this.body = body;
    this.erros = [];
    this.user = null;
  }

  register() {
    this.valida();
    if(this.erros.length > 0) return;
  }

  valida() {
    this.cleanUp();

    //validação

    // o email precisa ser válido
    if(validator.isEmail(this.body.email)) this.erros.push('Email inválido')
    // Asenha precisa ter 3 a 30 caracteres
    if(this.body.password.length < 3 || this.body.password.length > 50) {
      this.erros.push('A senha precisa ter entre 3 e 50 caracteres');
    }
  }
  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = Login;
