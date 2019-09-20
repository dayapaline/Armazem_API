const mongoose = require('../database/index');
const bcrypt = require('bcryptjs'); //encriptar a senha

const ProductSchema = new mongoose.Schema({
    codigo:{
        type:Number,
        require: true,
    },
    descricao:{
        type: String,
        require: true,
    },
    unidade:{
        type: String,
        require: true,
    },
    categoria:{
        type: String,
        require: true,
    },
    imagem:{
        type: String,
        require:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;