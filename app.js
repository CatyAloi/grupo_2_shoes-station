const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve (__dirname, './public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {res.sendFile(path.join(__dirname,'./views/home.html')); });

app.get('/detalleproducto', (req, res) => {res.sendFile(path.join(__dirname,'./views/detalle_producto.html')); });

// app.get('/catalogoproducto', (req, res) => {res.sendFile(path.join(__dirname,'./views/catalogo_producto.html')); });

// app.get('/contacto', (req, res) => {res.sendFile(path.join(__dirname,'./views/form_contact.html')); });

// app.get('/login', (req, res) => {res.sendFile(path.join(__dirname,'./views/form_login.html')); });

// app.get('/registro', (req, res) => {res.sendFile(path.join(__dirname,'./views/form_register.html')); });

app.get('/carrito', (req, res) => {res.sendFile(path.join(__dirname,'./views/cart.html')); });

app.listen(3000, () => console.log('Servidor Shoes_Station corriendo, http://localhost:3000'));