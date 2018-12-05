module.exports = (app) => {
    
    const express = require('express');
    const api_routes = express.Router();

    const user_controller = require('../controllers/user');
    const login_controller = require('../controllers/login');

    api_routes.get('/user', user_controller.get_users);
    api_routes.post('/user', user_controller.create_user);
    api_routes.get('/user/:id', user_controller.get_user);

    api_routes.post('/login', login_controller.login);

    app.use('/', api_routes);

}