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
        res.render("products/productDetail", { producto, talles: tallesJson });
    },
    carrito: (req, res)=> {
        res.render('products/productCart');
    },

    // MUESTRA EL FORMULARIO DE AGREGAR NUEVO PRODUCTO
    crearProducto: (req,res)=> { 
        res.render('products/addProduct'); },

    //GUARDAR O AGREGAR EL NUEVO PRODUCTO A LA BD       
    store: (req, res)=> { 
        let productNew = (req.body);
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
       
        productNew.id = productosTemporarios[0].id + 1;
        //----------------------------------------------------------
        productNew.img = req.file.filename;
        productsJson.push(productNew)
        const productNewJson = JSON.stringify(productsJson, null, 2);
        fs.writeFileSync('./data/productsData.json', productNewJson);
        res.redirect('/catalogo'); 
    },
    
    //EDITA EL PRODUCTO EXISTENTE          
    editarProducto: (req, res)=> {
        let producto = productsJson.find(producto => producto.id == req.params.id);
        res.render('products/form_edition', { producto, talles: tallesJson });
    },

    //ELIMINA EL PRODUCTO EXISTENTE 

};

module.exports = product_Controllers;