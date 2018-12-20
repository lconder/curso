const Joi = require('joi');

module.exports = {

    create_user : {
        body: {
            username: Joi.string().required(),
            email: Joi.string().email(),
            password: Joi.string().alphanum().min(6).max(32).when('email', {is: Joi.exist(), then: Joi.required(), otherwise: Joi.optional()}),
            facebook_id: Joi.string().when('email', {is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required()}),
            profile_image: Joi.string()
        }
    },

    login : {
        body: {
            email: Joi.string().email(),
            password: Joi.string().when('email', {is: Joi.exist(), then: Joi.required(), otherwise: Joi.optional()}),
            facebook_id: Joi.string().when('email', {is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required()})
        }
    }
}