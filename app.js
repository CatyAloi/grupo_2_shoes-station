const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require ('body-parser');

const publicPath = path.resolve (__dirname, './public');
app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

let rutasMain = require('./routes/mainRoutes');
let rutasProducts = require('./routes/productRoutes');
let rutasUsers = require('./routes/usersRoutes');
const res = require('express/lib/response');

app.use ('/', rutasMain);
app.use ('/', rutasProducts);
app.use ('/', rutasUsers);

app.post('/contacto', (req,res) =>{
    return res.send(req.body)
})

app.use ((req, res, next) => {
    res.status(404).render("Pagina no encontrada")
})

app.listen(3000, () => console.log('Servidor Shoes_Station corriendo, http://localhost:3000'));
