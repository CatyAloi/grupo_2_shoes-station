

const main_Controllers = {

    home: (req,res)=> {
        res.render('pages/home'); },
    
    contacto: (req,res)=> {
            res.render('pages/form_contact'); }

};

module.exports = main_Controllers;