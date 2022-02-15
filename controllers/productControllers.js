
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const productsJson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const listaProductos = require('../models/data');

const product_Controllers = {
    catalogo: (req, res)=> {
        res.render('products/catalogo');
    },
    detalle: (req, res)=> {
        let producto = listaProductos.find(producto => producto.id == req.params.id);
        res.render("products/productDetail", { producto });
    },
    carrito: (req, res)=> {
        res.render('products/productCart');
    },

    // MUESTRA EL FORMULARIO DE AGREGAR NUEVO PRODUCTO
    crearProducto: (req,res)=> { 
        res.render('products/addProduct'); },

    //GUARDAR O AGREGAR EL NUEVO PRODUCTO A LA BD       
    store: (req,res)=> { 

        let productNew = (req.body);
        productNew.img = req.file.filename;
        productsJson.push(productNew)
        const productNewJson = JSON.stringify(productsJson, null, 2);
        fs.writeFileSync('./data/productsData.json', productNewJson);
        res.redirect('/catalogo'); 
    },
    
    //EDITA EL PRODUCTO EXISTENTE          
    editarProducto: (req, res)=> {
        res.render('products/form_edition');
    },

    //ELIMINA EL PRODUCTO EXISTENTE 

};

module.exports = product_Controllers;