const { authJwt } = require("../middelware");
const controller = require("../controllers/artist.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put(
    "/api/V3/artist/update/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateArtist
  );

  app.get(
    "/api/V3/artist/find/:name",
    [authJwt.verifyToken],
    controller.findArtistByName
  );

app.get(
  "/api/V3/artist/all",
  [authJwt.verifyToken],
  controller.getAllArtists
  );

  app.delete(
    "/api/V3/artist/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteArtist
  );
};
