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
    crearProducto: (req, res)=> {
        res.render('products/addProduct');
    },
    editarProducto: (req, res)=> {
        res.render('products/form_edition');
    },
};

module.exports = product_Controllers;