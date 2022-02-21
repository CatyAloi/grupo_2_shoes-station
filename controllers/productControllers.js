const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data');
const productsJson = JSON.parse(fs.readFileSync(dataPath + '/productsData.json', 'utf-8'));
const tallesJson = JSON.parse(fs.readFileSync(dataPath + '/talles.json', 'utf-8'));

const product_Controllers = {
    catalogo: (req, res)=> {
        res.render('products/catalogo', { productos: productsJson, talles: tallesJson });
    },
    detalle: (req, res)=> {
        let producto = productsJson.find(producto => producto.id == req.params.id);
        res.render("products/productDetail", { producto });
    },
    carrito: (req, res)=> {
        res.render('products/productCart');
    },

    // MUESTRA EL FORMULARIO DE AGREGAR NUEVO PRODUCTO
    crearProducto: (req,res)=> { 
        res.render('products/addProduct', { talles: tallesJson }); 
    },

    //CREA Y ACTUALIZA UN PRODUCTO A LA BD       
    store: (req, res)=> { 
        const camposProductoFormulario = req.body;
        if (req.file) {
            camposProductoFormulario.img = req.file.filename;
        }
        if (req.params['id'] == undefined) {
            //Creación de ID temporario en base de dato se eliminara ---
            const productosTemporarios = [...productsJson];
            productosTemporarios.sort(function (a, b) {
                if (a.id > b.id) {
                    return -1;
                } else if (a.id < b.id) {
                    return 1;
                } 
                
                return 0;
            });
        
            camposProductoFormulario.id = productosTemporarios[0].id + 1;
            //----------------------------------------------------------
            productsJson.push(camposProductoFormulario)
            const updatedProducts = JSON.stringify(productsJson, null, 2);
            fs.writeFileSync('./data/productsData.json', updatedProducts);
            res.redirect('/catalogo'); 
        } else {
            const id = req.params.id;
            const product = productsJson.find(function (producto){
                return producto.id == id;
            });
            product.nombreProducto = camposProductoFormulario.nombreProducto;
            product.codigo = camposProductoFormulario.codigo;
            if (camposProductoFormulario.img) {
                product.img = camposProductoFormulario.img;
            }
            product.precio = camposProductoFormulario.precio;
            product.descuento = camposProductoFormulario.descuento;
            product.descripcion = camposProductoFormulario.descripcion;
            product.talle = camposProductoFormulario.talle;
            product.marca = camposProductoFormulario.marca;
            product.categoria = camposProductoFormulario.categoria;
            product.status = camposProductoFormulario.status;
            product.stock = camposProductoFormulario.stock;
            const updatedProducts = JSON.stringify(productsJson, null, 2);
            fs.writeFileSync('./data/productsData.json', updatedProducts);
            res.redirect('/detalle/' + id);
        }
    },
    
    //EDITA EL PRODUCTO EXISTENTE          
    editarProducto: (req, res)=> {
        let producto = productsJson.find(producto => producto.id == req.params.id);
        res.render('products/form_edition', { producto, talles: tallesJson });
    },

    //ELIMINA EL PRODUCTO EXISTENTE 

};

module.exports = product_Controllers;