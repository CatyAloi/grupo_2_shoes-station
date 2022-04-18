const fs = require('fs');
const path = require('path');
const modelProductos = require('../models/producto'); 

const dataPath = path.join(__dirname, '../data');
let productsJson = JSON.parse(fs.readFileSync(dataPath + '/productsData.json', 'utf-8'));
const db = require('../database/models');

const product_Controllers = { 
    catalogo: async(req, res)=> {
        try {
            const tallesDb = await db.talles.findAll();
    
            res.render('products/catalogo', {  productos: productsJson, talles: tallesDb, usuario: req.session.userLogged }); 
        } catch (e) {
            console.log('errorrrrr', e);
        } 
    },
    detalle: async(req, res)=> {
        try {
            const productoDB = await db.productos.findOne({
                include: [
                    {
                        model: db.marcas,
                    },
                    {
                        model: db.talles,
                        through: {
                            model: db.productos_talles,
                        }
                    }
                ], 
                where: { id: req.params.id },
                order: [
                    [db.talles, 'numero', 'ASC'],
                ]
            });

            if (!productoDB) {
                res.redirect('/404');
                return;
            }

            const tallesDb = await db.talles.findAll();

            res.render('products/productDetail', {  producto: productoDB, talles: tallesDb, usuario: req.session.userLogged }); 
        } catch (e) {
            console.log('errorrrrr', e);
        } 
    },
    carrito: (req, res)=> {
        res.render('products/productCart',{ usuario: req.session.userLogged });
    },

    // MUESTRA EL FORMULARIO DE AGREGAR NUEVO PRODUCTO
    crearProducto: async (req,res)=> {
        try {
            const tallesDb = await db.talles.findAll();

            res.render('products/addProduct', { talles: tallesDb, usuario: req.session.userLogged }); 
        } catch (e) {
            console.log('errorrrrr', e);
        } 
    },

    //CREA Y ACTUALIZA UN PRODUCTO A LA BD       
    store: async (req, res)=> { 
        const camposProductoFormulario = req.body;
        if (req.file) {
            camposProductoFormulario.img = req.file.filename;
        }
        if (!req.params['id']) {
            try {
                const productoGuardado = await db.productos.create(camposProductoFormulario);

                camposProductoFormulario.talles.forEach(async (idTalle) => {
                    await db.productos_talles.create({
                        id_producto: productoGuardado.id,
                        id_talle: idTalle,
                    });
                });
            } catch (error) {
                console.log(error);
            }

            res.redirect('/catalogo');
        } else {
            const id = req.params.id;

            try {
                await db.productos_talles.destroy({ where: { id_producto: id }});
                
                camposProductoFormulario.talles.forEach(async (idTalle) => {
                    await db.productos_talles.create({
                        id_producto: id,
                        id_talle: idTalle,
                    });
                });

                const productoActualizado = {
                    nombre: camposProductoFormulario.nombre,
                    precio: camposProductoFormulario.precio,
                    descuento: camposProductoFormulario.descuento,
                    id_marca: camposProductoFormulario.id_marca,
                    stock: camposProductoFormulario.stock,
                    genero: camposProductoFormulario.genero,
                    descripcion: camposProductoFormulario.descripcion,
                }

                if (camposProductoFormulario.img) {
                    productoActualizado.img = camposProductoFormulario.img;
                }
            
                const producto = await db.productos.update(productoActualizado, { where: { id }});
                producto.save();

            } catch (error) {
                console.log(error);
            }

            res.redirect('/detalle/' + id);
        }
    },
    
    //EDITA EL PRODUCTO EXISTENTE          
    editarProducto: async(req, res)=> {
        try {
            const tallesDb = await db.talles.findAll();

            const productoDB = await db.productos.findOne({
                include: [
                    {
                        model: db.marcas,
                    },
                    {
                        model: db.talles,
                        through: {
                            model: db.productos_talles,
                            key: 'id_talle',
                        }
                    }
                ], 
                where: { id: req.params.id }
            });

            if (!productoDB) {
                res.redirect('/404');
                return;
            }
            
            res.render('products/form_edition', { producto: productoDB, talles: tallesDb, usuario: req.session.userLogged }); 
        } catch (e) {
            console.log('error', e);
        }
    },

    //ELIMINA EL PRODUCTO EXISTENTE 
    borrarProducto: (req, res)=> {
        productsJson = modelProductos.borrarProducto(req.params.id);
        res.redirect('/catalogo');
    },
};

module.exports = product_Controllers;