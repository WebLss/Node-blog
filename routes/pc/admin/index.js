var admin = function (name ,app) {
    app.use(name + '/user', require('./userRouter'));
};

module.exports = admin;
