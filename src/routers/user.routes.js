const { authJwt } = require("../middelware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
app.use(function(req, res, next) {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

    app.get("/api/V3/test/all", controller.allAccess);

    app.get("/api/V3/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
    "/api/V3/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
    );

    app.put(
        "/api/V3/user/update/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateUser
      );
      
      app.delete(
        "/api/V3/user/delete/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteUser
      );
      
};