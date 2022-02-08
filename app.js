const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require ('body-parser');

const publicPath = path.resolve (__dirname, './public');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(publicPath));

app.use(bodyParser.json());
app.set('view engine', 'ejs');

let rutasUsers= require('../routes/loginRouter');
app.use('/login', rutasUser);

app.listen(3000, () => console.log('Servidor Shoes_Station corriendo, http://localhost:3000'));