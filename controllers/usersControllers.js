
const users_Controllers = {

    login: (req,res)=> {
        res.render('users/login'); },
    
    registro: (req,res)=> {
        res.render('users/register'); },
        
};

module.exports = users_Controllers;
