const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Products = require('../models/products');



router.get('/', async (req, res)=> {
    //para listar os produtos
    try{
        const products = await Products.find().populate('user');
        return res.send({ products });
    }
    catch(err){
        return res.status(400).send({error: 'Erro ao carregar os produtos'});
    }
});
router.get('/:productId', async (req, res)=> {
    //requisição/listar um único prroduto
    try{
        const product = await Products.findById(req.params.productId).populate(['user', 'tasks']);
        return res.send({ product });
    }
    catch(err){
        return res.status(400).send({error: 'Erro ao carregar o produto'});
    }
});

router.post('/', async (req, res) => {
    //para criar um produto
    try{
        const { codigo, descricao , unidade, categoria, imagem } = req.body;
        const product = await Products.create({codigo, descricao , unidade, categoria, imagem });

        await product.save();

        return res.send({ product });
    }
    catch(err){
        console.log(err);
        return res.status(400).send({error: 'Erro ao criar um novo produto'});
    }
});
router.put('/:productId', async (req, res) => {
    //para atualizar um produto
    try{
        const { codigo, descricao , unidade, categoria, imagem } = req.body;
        const product = await Products.findByIdAndUpdate(req.params.productId,{codigo, descricao , unidade, categoria, imagem }, {new: true});

        
        await product.save();
        return res.send({ product });
    }
    catch(err){
        return res.status(400).send({error: 'Erro ao atualizar produto'});
    }
});
router.delete('/:productId', async (req,res)=>{
    try{
        await Products.findByIdAndRemove(req.params.productId);
        return res.send();
    }catch{
        return res.status(400).send({error: 'Erro ao deletar produto'}); 
    }
});
module.exports = app => app.use('/products', router);