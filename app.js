const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require ('body-parser');

const publicPath = path.resolve (__dirname, './public');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(publicPath));

app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.set("views", __dirname + "/views");

app.use('/login', require('./routes/loginRouter'));
app.use('/register', require('./routes/registerRouter'));

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/detalleproducto', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/productDetail.html')); });

app.get('/catalogoproducto', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/catalogo_producto.html')); });

app.get('/contacto', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/form_contact.html')); });

app.post('/contacto', (req,res) =>{
    return res.send(req.body)
})

app.get("/login", (req, res) => {
    res.render("login.ejs", { titulo: "formulario de login" });
  });
  
  app.get("/register", (req, res) => {
    res.render("register.ejs", { titulo: "formulario de registro" });
  });

app.get('/login', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/login.html')); });

app.get('/catalogo', (req, res) => {res.sendFile(path.join(__dirname,'./views/catalogo.html')); });

app.get('/contacto', (req, res) => {res.sendFile(path.join(__dirname,'./views/form_contact.html')); });

app.get('/registro', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/register.html')); });

app.get('/carrito', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/productCart.html')); });

app.get('/agregarproductos', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/addProduct.html')); });

app.get('/carrito', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/carrito.html')); });

app.get('/editarproductos', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/form_edition.html')); });

app.listen(3000, () => console.log('Servidor Shoes_Station corriendo, http://localhost:3000'));