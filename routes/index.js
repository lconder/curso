module.exports = (app) => {
    
    const express = require('express');
    const api_routes = express.Router();

    const user_controller = require('../controllers/user');
    const login_controller = require('../controllers/login');
    const concert_controller = require('../controllers/concert');

    api_routes.get('/user', user_controller.get_users);
    api_routes.post('/user', user_controller.create_user);
    api_routes.get('/user/:id', user_controller.get_user);

    api_routes.get('/concert', concert_controller.get_concerts);
    api_routes.post('/concert', concert_controller.create_concert);

    api_routes.post('/login', login_controller.login);

    app.use('/', api_routes);

}