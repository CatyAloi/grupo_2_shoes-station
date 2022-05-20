const db = require("./database/models/index");

async function getAll (options= {} ){
    const productos = await db.productos.findAll(options);

}