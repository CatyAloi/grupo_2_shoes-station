const modelProductos = require('../models/producto'); 

const product_Controllers = {
    catalogo: (req, res)=> {
        const productos = modelProductos.cargarProductos().productos;
        res.render('products/catalogo', { productos });
    },
    detalle: (req, res)=> {
        const listaProductos = modelProductos.cargarProductos().productos;
        let producto = listaProductos.find(producto => producto.id == req.params.id);
        if (!producto) {
            res.render('products/notfound');
        }
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
    borrarProducto: (req, res)=> {
      modelProductos.borrarProducto(req.params.id);
      res.redirect('/');
    },
};

module.exports = product_Controllers;