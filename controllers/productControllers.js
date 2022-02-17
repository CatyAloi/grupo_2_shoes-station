const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const productsJson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const product_Controllers = {
    catalogo: (req, res)=> {
        res.render('products/catalogo', { productos: productsJson });
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
        console.log(productNew);
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