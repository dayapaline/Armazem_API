const jwt = require('jsonwebtoken'); // verifica Token
const authConfig = require('../config/auth.json');
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).send({error: 'No token provided'});
    }

    // formato token: Bearer seguido de hash (dbfjsbfhgcv4525vcdsnhjg4545)
    // verificando se o token está no formato correto
    const parts = authHeader.split(' ');
    if (!parts.length === 2 ){
        return res.status(401).send({error: 'Erro no Token'});
    }

    const [ scheme, token ] = parts;
    if(!/^Bearer$/i.test(scheme)){
        //verifica se tem escrito Bearer no scheme
        return res.status(401).send({error: 'Token mal formado'});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        //verifica se o token bate com o que foi definido no secret no config
        console.log("meu" + token);
        console.log(authConfig.secret);
        if(err){
            res.status(401).send({error: 'Token inválido'});
        }

        req.userId = decoded.id;
        //req.username = decoded.username;
        //req.coduser = decoded.coduser;
        return next();
    });
};