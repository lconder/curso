module.exports = (app) => {
    
    const express = require('express');
    const api_routes = express.Router();
    /**
     * @apiDefine ThreeErrors
     * @apiError (400,401,500 Error) {String} message Descripción del error
     * @apiError (400,401,500 Error) {Object[]} errors Lista de errores
     * @apiError (400,401,500 Error) {String} errors.path Path del error
     * @apiError (400,401,500 Error) {String} errors.message Información acerca del error
     */

    const user_controller = require('../controllers/user');
    const login_controller = require('../controllers/login');
    const concert_controller = require('../controllers/concert');

    api_routes.get('/user', user_controller.get_users);
    /**
     @api {post} /user Crear un usuario
     @apiName Create User
     @apiGroup User
     @apiPermission None

     @apiParam (body) {String} username Nombre de usuario.
     @apiParam (body) {String} email Email del usuario.
     @apiParam (body) {String} password Email del usuario.
     @apiParam (body) {String} facebook_id Email del usuario.

     @apiSuccess (200 Success) {Object} user
     @apiSuccess (200 Success) {String} user.username Nombre de usuario.
     @apiSuccess (200 Success) {String} user.id  ID del usuario.
     @apiSuccess (200 Success) {String} user.email  Email del usuario.
     @apiSuccess (200 Success) {String} user.password  Password del usuario.
     @apiSuccess (200 Success) {String} user.facebook_id  ID de Fb del usuario.
     @apiSuccess (200 Success) {String} user.ranking  Calificación del usuario.


     @apiUse ThreeErrors
     **/
    api_routes.post('/user', user_controller.create_user);
    api_routes.get('/user/:id', user_controller.get_user);

    api_routes.get('/concert', concert_controller.get_concerts);
    api_routes.post('/concert', concert_controller.create_concert);

    api_routes.post('/login', login_controller.login);

    app.use('/', api_routes);

}