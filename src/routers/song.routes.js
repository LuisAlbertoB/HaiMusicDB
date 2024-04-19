const { authJwt } = require("../middelware");
const controller = require("../controllers/song.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/V3/song/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createSong
  );

  app.put(
    "/api/V3/song/update/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateSong
  );

  app.get(
    "/api/V3/song/find/:name",
    [authJwt.verifyToken],
    controller.findSong
  );

  app.delete(
    "/api/V3/song/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteSong
  );

  app.get(
    "/api/V3/song/all",
    [authJwt.verifyToken],
    controller.getAllSongs
  );  
  
};