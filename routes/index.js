module.exports = (app) => {
    
    const express = require('express');
    const api_routes = express.Router();
    const joi = require('express-joi-middleware');
    const inputs = require('../utils/inputs');
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
    const artist_controller = require('../controllers/artist');

    api_routes.get('/user', user_controller.get_users);
    /**
     @api {post} /user Crear un usuario
     @apiName Create User
     @apiGroup User
     @apiPermission None

     @apiParam (body) {String} username Nombre de usuario.
     @apiParam (body) {String} email Email del usuario.
     @apiParam (body) {String} password Contraseña del usuario.
     @apiParam (body) {String} facebook_id ID de FB del usuario.
     @apiParam (body) {String} [profile_image] Url a la imagen de perfil.

     @apiSuccess (200 Success) {Object} user
     @apiSuccess (200 Success) {String} user.username Nombre de usuario.
     @apiSuccess (200 Success) {String} user.id  ID del usuario.
     @apiSuccess (200 Success) {String} user.email  Email del usuario.
     @apiSuccess (200 Success) {String} user.password  Password del usuario.
     @apiSuccess (200 Success) {String} user.facebook_id  ID de Fb del usuario.
     @apiSuccess (200 Success) {String} user.ranking  Calificación del usuario.
     @apiSuccess (200 Success) {String} user.profile_image  URL de la imagen de perfil.

     @apiUse ThreeErrors
     **/
    api_routes.post('/user', joi(inputs.create_user), user_controller.create_user);
    api_routes.get('/user/:id', user_controller.get_user);

    /**
     @api {post} /concert Obtener conciertos
     @apiName Get concerts
     @apiGroup Concert
     @apiPermission None
     
     @apiSuccess (200 Success) {Object} concerts
     @apiSuccess (200 Success) {String} concerts.name Nombre del concierto.
     @apiSuccess (200 Success) {String} concerts.place Lugar del concierto
     @apiSuccess (200 Success) {String} concerts.address Dirección del concierto.
     @apiSuccess (200 Success) {String} concerts.quota Capacidad del concierto.
     @apiSuccess (200 Success) {String} concerts.date Fecha del concierto.
     @apiSuccess (200 Success) {String} concerts.hour Hora del concierto.
     @apiSuccess (200 Success) {String} concerts.cost Costo del concierto.

     @apiUse ThreeErrors
     **/
    api_routes.get('/concert', concert_controller.get_concerts);
    api_routes.post('/concert', concert_controller.create_concert);
    api_routes.put('/concert/:id', concert_controller.add_user);
    
    /**
     @api {post} /login Login
     @apiName Login
     @apiGroup Login
     @apiPermission None
     
     @apiParam (body) {String} [email] Email del usuario (No se envía si se mandan facebook_id).
     @apiParam (body) {String} [password] Contraseña del usuario (No se envía si se mandan facebook_id).
     @apiParam (body) {String} [facebook_id] ID de FB del usuario (No se envía si se mandan email y password).

     @apiSuccess (200 Success) {Object} user
     @apiSuccess (200 Success) {String} user.username Nombre de usuario.
     @apiSuccess (200 Success) {String} user.id  ID del usuario.
     @apiSuccess (200 Success) {String} user.email  Email del usuario.
     @apiSuccess (200 Success) {String} user.password  Password del usuario.
     @apiSuccess (200 Success) {String} user.facebook_id  ID de Fb del usuario.
     @apiSuccess (200 Success) {String} user.ranking  Calificación del usuario.

     @apiUse ThreeErrors
     **/
    api_routes.post('/login', joi(inputs.login), login_controller.login);

    api_routes.post('/artist', artist_controller.create_artist);
    api_routes.post('/artist/search/', artist_controller.search_artist);
    api_routes.get('/artist/:id_spotify', artist_controller.get_artist_by_spotify_id);



    app.use('/', api_routes);

};