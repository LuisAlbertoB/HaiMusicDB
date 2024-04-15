const { authJwt } = require("../middelware");
const controller = require("../controllers/disk.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put(
    "/api/V3/disk/update/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateDisk
  );
};
