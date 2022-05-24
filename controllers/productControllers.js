const fs = require('fs');
const path = require('path');
const modelProductos = require('../models/producto');
const {validationResult} = require('express-validator'); 

const dataPath = path.join(__dirname, '../data');
let productsJson = JSON.parse(fs.readFileSync(dataPath + '/productsData.json', 'utf-8'));
const db = require('../database/models');

const product_Controllers = { 
    catalogo: async(req, res)=> {
        console.log('Esto es el catalogo', req.query)
        try {
             
            const tallesDb = await db.talles.findAll();
            const marcasDb= await db.marcas.findAll();
            let options = {};
           
            if (req.query.generos && req.query.marcas && req.query.talles) {
                options = {
                    include: [
                        {
                            model: db.talles,
                            through: {
                                model: db.productos_talles,
                            },
                            where: {
                                id: req.query.talles
                            }
                        },
                        {
                            model: db.marcas,
                            where: {
                                id: req.query.marcas
                            }
                        }
                    ],
                    where: {
                        genero: req.query.generos,
                    }
                };
            } else if(req.query.generos && req.query.marcas) {
                options = {
                    where: { genero: req.query.generos, id_marca: req.query.marcas }
                }
            } else if (req.query.generos && req.query.talles) {
                options = {
                    include: [
                        {
                            model: db.talles,
                            through: {
                                model: db.productos_talles,
                            },
                            where: {
                                id: req.query.talles
                            }
                        }
                    ],
                    where: {
                        genero: req.query.generos
                    }
                }
            } else if (req.query.marcas && req.query.talles) {
                options = {
                    include: [
                        {
                            model: db.talles,
                            through: {
                                model: db.productos_talles,
                            },
                            where: {
                                id: req.query.talles
                            }
                        }
                    ],
                    where: {
                        id_marca: req.query.marcas
                    }
                }
            } else if (req.query.generos) {
                options = {
                    where: { genero: req.query.generos }
                }
            } else if (req.query.marcas) {
                options = { 
                    where: { id_marca: req.query.marcas }
                };
               
            } else if (req.query.talles) {
                options = {
                    include: [
                        {
                            model: db.talles,
                            through: {
                                model: db.productos_talles,
                            },
                            where: {
                                id: req.query.talles
                            }
                        }
                    ],          
                }
            } 

            const productosDb = await db.productos.findAll(options);
            res.render('products/catalogo', { 
                productos: productosDb, 
                talles: tallesDb, 
                marcas: marcasDb, 
                usuario: req.session.userLogged,
                filtros: req.query,
            });
        } catch (e) {
            console.log('error', e);
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

            console.log('productoDB', productoDB);

            if (!productoDB) {
                res.redirect('/404');
                return;
            }

            const tallesDb = await db.talles.findAll();

            res.render('products/productDetail', {  producto: productoDB, talles: tallesDb, usuario: req.session.userLogged }); 
        } catch (e) {
            console.log('error', e);
        } 
    },
    carrito: (req, res)=> {
        res.render('products/productCart',{ usuario: req.session.userLogged });
    },

    carrito_producto: (req, res)=> {
        res.render('products/productCart');
    },

    // MUESTRA EL FORMULARIO DE AGREGAR NUEVO PRODUCTO
    crearProducto: async (req,res)=> {
        try {
            const tallesDb = await db.talles.findAll();
            const marcasDb= await db.marcas.findAll();

            res.render('products/addProduct', { talles: tallesDb, marcas: marcasDb, usuario: req.session.userLogged }); 
        } catch (e) {
            console.log('error', e);
        } 
    },
    
    
    //VALIDACIONES DEL FORMULARIO AGREGAR PRODUCTO 
    processadd: async (req,res,next)=>{
        const resultCreated = validationResult(req);
        if (resultCreated.errors.length){
            const marcasDb= await db.marcas.findAll();
            const tallesDb = await db.talles.findAll();
            return res.render ('products/addProduct', {talles: tallesDb, marcas: marcasDb, errors : resultCreated.mapped(), 
                                                        oldData: req.body, usuario: req.session.userLogged});
        } 
        console.log("hola")
        return next()
    },

    //VALIDACIONES DEL FORMULARIO EDITAR PRODUCTO  
    processedit: async (req,res, next)=>{
        const resultEdit = validationResult(req);
        const tallesDb = await db.talles.findAll();
        const marcasDb = await db.marcas.findAll();
        const productoDB = await db.productos.findOne({
            include: [
        
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

        if (resultEdit.errors && resultEdit.errors.length) {
           return res.render ('products/form_edition', {talles: tallesDb, producto: productoDB, 
                                                        errors : resultEdit.mapped(), 
                                                        oldData: req.body, 
                                                        marcas: marcasDb,
                                                        usuario: req.session.userLogged});
       
        }
        return next()
       
    },


    //CREA Y ACTUALIZA UN PRODUCTO A LA BD   
    store: async (req, res)=> { 

        console.log(req.body)

        const camposProductoFormulario = req.body;
        if (req.file) {
            camposProductoFormulario.img = req.file.filename;
        }

        if(camposProductoFormulario.recomendado === 'on') {
            camposProductoFormulario.recomendado = true;
        } else {
            camposProductoFormulario.recomendado = false
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
                    recomendado: camposProductoFormulario.recomendado
                }

                if (camposProductoFormulario.img) {
                    productoActualizado.img = camposProductoFormulario.img;
                }

                const producto = await db.productos.update(productoActualizado, { where: { id }});
                // producto.save();

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
            const marcasDb= await db.marcas.findAll();

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
            
            res.render('products/form_edition', { producto: productoDB, talles: tallesDb, marcas: marcasDb, usuario: req.session.userLogged }); 
        } catch (e) {
            console.log('error', e);
        }
    },

    //ELIMINA EL PRODUCTO EXISTENTE 
    borrarProducto: async(req, res)=> {
        await db.productos_talles.destroy({
            where:{
                id_producto:req.params.id 
            }
        })
        await db.productos.destroy({
            where:{
                id: req.params.id 
         }
        });
        const productos = await db.productos.findAll()
        res.redirect('/catalogo');

    },
};

    //borrarProducto: (req, res)=> {
       // productsJson = modelProductos.borrarProducto(req.params.id);
       // res.redirect('/catalogo');

module.exports = product_Controllers;