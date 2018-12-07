const router = require('../routes/index');
const error = require('../middlewares/error');

module.exports = app => {
    router(app);
    app.use(error);
}