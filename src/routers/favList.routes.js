const { authJwt } = require("../middelware");
const controller = require("../controllers/favList.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/V3/favlist/add",
    [authJwt.verifyToken],
    controller.addSongToFavList
  );

  app.delete(
    "/api/V3/favlist/remove",
    [authJwt.verifyToken],
    controller.removeSongFromFavList
  );
};
