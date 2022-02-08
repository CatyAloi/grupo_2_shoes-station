
const listaProductos = [
{
    id: 1,
    nombreProducto:'Zapatillas Adidas Coreracer',
    codigo:'ma_001',
    img:'ma_001.jpg',
    precio:'18.500',
    descripcion: 'Las zapatillas Adidas introducen un estilo deportivo y versátil a cada mujer. El exterior de malla transpirable ofrece comodidad de la mañana a la noche y la mediasuela de EVA amortigua cada uno de tus pasos.',
    talle:'37',
    marca:'Adidas',
    categoria:'Mujer'
},


{
    id: 2,
    nombreProducto:'Zapatillas Adidas Postmove',
    codigo:'ma_002',
    img:'ma_002.jpg',
    precio:'19.500',
    descripcion:'Las zapatillas Adidas introducen un estilo deportivo y versátil a cada mujer. El exterior de malla transpirable ofrece comodidad de la mañana a la noche y la mediasuela de EVA amortigua cada uno de tus pasos.',
    talle:'39',
    marca:'Adidas',
    categoria:'Mujer'
},

{
    id: 3,
    nombreProducto:'Zapatillas Adidas Showtheway',
    codigo:'ha_003',
    img:'ha_003.jpg',
    precio:'19.500',
    descripcion:'Inspiradas para deportistas, las Zapatillas Adidas son ideales para los hombres amantes de entrenamientos. El exterior de malla elástica en estas zapatillas es cómodo y transpirable, y la mediasuela con amortiguación ofrece apoyo al pie en cada pisada.',
    talle:'39',
    marca:'Adidas',
    categoria:'Hombre'
},


{
    id: 4,
    nombreProducto:'Zapatillas Adidas Lite Racer 2.0',
    codigo:'ha_004',
    img:'ha_004.jpg',
    precio:'19.500',
    descripcion:'Inspiradas para deportistas, las Zapatillas Adidas son ideales para los hombres amantes de entrenamientos. El exterior de malla elástica en estas zapatillas es cómodo y transpirable, y la mediasuela con amortiguación ofrece apoyo al pie en cada pisada.',
    talle:'39',
    marca:'Adidas',
    categoria:'Hombre'
},



{
    id: 5,
    nombreProducto:'Zapatillas Nike Air Zoom Pegasus',
    codigo:'mn_001',
    img:'mn_001.jpg',
    precio:'19.500',
    descripcion:'Las zapatillas Nike son un calzado versátil para la mujer de hoy y todos sus días. Inspirado en modelos running de los años 80, se compone de una parte superior de materiales y una suela de goma para mayor tracción y durabilidad.',
    talle:'39',
    marca:'Nike',
    categoria:'Mujer'
},

{
    id: 6,
    nombreProducto:'Zapatillas Nike Venture Runner',
    codigo:'mn_002',
    img:'mn_002.jpg',
    precio:'19.500',
    descripcion:'Las zapatillas Nike son un calzado versátil para la mujer de hoy y todos sus días. Inspirado en modelos running de los años 80, se compone de una parte superior de materiales y una suela de goma para mayor tracción y durabilidad.',
    talle:'39',
    marca:'Nike',
    categoria:'Mujer'
},

{
    id: 7,
    nombreProducto:'Zapatillas Nike Renew Run 2',
    codigo:'hn_003',
    img:'hn_003.jpg',
    precio:'19.500',
    descripcion:'Las Zapatillas Nike fueron especialmente diseñadas para los hombres amantes del running, que quieren salir a correr con el calzado más cómodo y liviano.',
    talle:'39',
    marca:'Nike',
    categoria:'Hombre'
},
{
    id: 8,
    nombreProducto:'Zapatillas Nike Quest 4',
    codigo:'hn_004',
    img:'hn_004.jpg',
    precio:'19.500',
    descripcion:'Las Zapatillas Nike fueron especialmente diseñadas para los hombres amantes del running, que quieren salir a correr con el calzado más cómodo y liviano.',
    talle:'39',
    marca:'Nike',
    categoria:'Hombre'
},

{
    id: 9,
    nombreProducto:'Zapatillas Under Armour HOVR Machina',
    codigo:'mu_001',
    img:'mu_001.jpg',
    precio:'19.500',
    descripcion:'Para la mujer amante de días de running son perfectas las Zapatillas Under Armour por su diseño te harán rendir mejor en entrenamiento y carrera, mientras amortigua tus pisadas gracias a su media suela en espuma que te da estabilidad y firmeza a la hora de correr.',
    talle:'37',
    marca:'Under Armour',
    categoria:'Mujer'
},
{
    id: 10,
    nombreProducto:'Zapatillas Under Armour Essential',
    codigo:'mu_002',
    img:'mu_002.jpg',
    precio:'19.500',
    descripcion:'Para la mujer amante de días de running son perfectas las Zapatillas Under Armour por su diseño te harán rendir mejor en entrenamiento y carrera, mientras amortigua tus pisadas gracias a su media suela en espuma que te da estabilidad y firmeza a la hora de correr.',
    talle:'39',
    marca:'Under Armour',
    categoria:'Mujer'
},

{
    id: 11,
    nombreProducto:'Zapatillas Under Armour Phade RN',
    codigo:'hu_003',
    img:'hu_003.jpg',
    precio:'19.500',
    descripcion:'Las zapatillas Under Armour nacieron para los hombres que quieren alcanzar nuevos desafíos mientras corres. Confeccionadas con estructuras fuertes que se flexionan al momento de aplicar presión para un soporte más reactivo',
    talle:'39',
    marca:'Under Armour',
    categoria:'Hombre'
},

{
    id: 12,
    nombreProducto:'Zapatillas Under Armour Charged Surpass',
    codigo:'hu_004',
    img:'hu_004.jpg',
    precio:'17.500',
    descripcion:'Las zapatillas Under Armour nacieron para los hombres que quieren alcanzar nuevos desafíos mientras corres. Confeccionadas con estructuras fuertes que se flexionan al momento de aplicar presión para un soporte más reactivo',
    talle:'39',
    marca:'Under Armour',
    categoria:'Hombre'
}

]



const product_Controllers = {

    catalogo: (req,res)=> {
        res.render('products/catalogo'); },
    
    detalle: (req,res)=> {
        /*let producto = listaProductos.find(producto => producto.id == req.params.catalogoId)
        console.log(producto)
        res.render("products/productDetail", { producto: producto });*/
        res.render('products/productDetail'); 
    },

           
    carrito: (req,res)=> {
        res.render('products/productCart'); },

    crearProducto: (req,res)=> {
        res.render('products/addProduct'); },

    editarProducto: (req,res)=> {
            res.render('products/form_edition'); },
    
};

module.exports = product_Controllers;