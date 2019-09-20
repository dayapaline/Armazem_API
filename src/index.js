const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // para entender quando enviar requisições para api com informações em JSON
app.use(bodyParser.urlencoded({extended: false})); // entender quando passar parâmetros via URL

require('./controllers/authController')(app);
require('./controllers/projectController')(app);
require('./controllers/productsController')(app);

app.listen(3000); //porta que quero ouvir