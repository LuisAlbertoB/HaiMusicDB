const { authJwt } = require("../middelware");
const controller = require("../controllers/likedList.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/V3/likedList/like",
    [authJwt.verifyToken],
    controller.likeSong
  );

  app.delete(
    "/api/V3/likedList/unlike",
    [authJwt.verifyToken],
    controller.unlikeSong
  );
};
