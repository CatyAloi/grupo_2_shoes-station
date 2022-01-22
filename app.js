const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve (__dirname, './public');
app.use(express.static(publicPath));


app.get('/login', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/login.html')); });

app.get('/registro', (req, res) => {res.sendFile(path.resolve(__dirname,'./views/register.html')); });



app.listen(3001, () => console.log('Servidor Shoes_Station corriendo, http://localhost:3001'));