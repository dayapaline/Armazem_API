const express = require('express');
const User = require('../models/user');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        //criando o token
        expiresIn:86400,
    })
}

router.post('/register', async(req, res) => {
    const { coduser } = req.body;
    try {
        if(await User.findOne({ coduser })) {
            return res.status(400).send({error: 'Usuário já cadastrado'});
        }
        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({
            user,
            token: generateToken({id: user.id}),
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).send({ error: 'Falha ao cadastrar'});
    }
});

router.post('/authenticate', async (req, res) => {
    const { coduser, password } = req.body;
    const user = await User.findOne({ coduser }).select('+password');
    if(!user){
        return res.status(400).send({ error:'Usuário não encontrado'});
    }
    if(!await bcrypt.compare(password, user.password)){
        
        //compara se a senha que ele esta fazendo login é a mesma salva no banco
        return res.status(400).send({ error: 'Senha Inválida'});
    }
    user.password = undefined;
    
    res.send({ 
        user, 
        token: generateToken({id: user.id,  username: user.username, coduser: user.coduser}),
     });

});

module.exports = (app) => app.use('/auth', router);