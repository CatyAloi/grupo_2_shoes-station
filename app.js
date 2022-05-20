const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const bodyParser = require ('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const estaRecordado = require('./middlewares/estaRecordado');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(methodOverride('_method'));

//agrego el cookie parser
app.use(cookieParser());

const publicPath = path.resolve (__dirname, './public');
app.use(express.static(publicPath));

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(express.urlencoded());
app.use(express.json());

app.use(authMiddleware, estaRecordado);

app.set('view engine', 'ejs');

let rutasMain = require('./routes/mainRoutes');
let rutasProducts = require('./routes/productRoutes');
let rutasUsers = require('./routes/usersRoutes');

app.use ('/', rutasMain);
app.use ('/', rutasProducts);
app.use ('/', rutasUsers);

app.use ((req, res, next) => {
    res.status(400).render('./errors/error404');
    next();
});



 
app.listen(3000, () => console.log('Servidor Shoes_Station corriendo, http://localhost:3000'));
