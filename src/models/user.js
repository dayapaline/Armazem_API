const mongoose = require('../database/index');
const bcrypt = require('bcryptjs'); //encriptar a senha

const UserSchema = new mongoose.Schema({
    coduser:{
        type: Number,
        required: true,
    },
    login:{
        type: String,
        required: true, 
    },
    email:{
        type: String,
        required: true,
        lowercase: false, // forçar ser convertido em caixa baixa
    },
    nome:{
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // quando buscar a lista de usuario o campo não vem junto
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
}); // encriptar a senha

const User = mongoose.model('User', UserSchema);
module.exports = User;