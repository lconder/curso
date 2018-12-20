const User = require('../models/user');

async function login(req, res, next) {

    try {
        const facebook_id = req.body.facebook_id;
        const email = req.body.email;
        const password = req.body.password;
        
        let search_criteria = (!facebook_id) ? {email, password} : {facebook_id}; 

        let user = await User.findOne(search_criteria);

        if(user)
            res.status(200).json({user});
        else
            res.status(404).json({message: 'Usuario no encontrado'});

    } catch(e) {
        next(e);
    }
}

module.exports = {
    login
}