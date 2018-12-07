const Joi = require('joi');

module.exports = {

    create_user : {
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(4).max(8).required(),
        facebook_id: Joi.string()
    }
}