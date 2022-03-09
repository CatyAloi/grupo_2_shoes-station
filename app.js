const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const bodyParser = require ('body-parser');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const publicPath = path.resolve (__dirname, './public');
app.use(express.static(publicPath));

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

let rutasMain = require('./routes/mainRoutes');
let rutasProducts = require('./routes/productRoutes');
let rutasUsers = require('./routes/usersRoutes');

app.use ('/', rutasMain);
app.use ('/', rutasProducts);
app.use ('/', rutasUsers);

app.post('/contacto', (req,res) =>{
    return res.send(req.body)
})
 
app.listen(3000, () => console.log('Servidor Shoes_Station corriendo, http://localhost:3000'));
