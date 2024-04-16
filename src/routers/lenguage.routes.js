const { authJwt } = require("../middelware");
const languageController = require("../controllers/lenguage.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/V3/songs/spanish",
    [authJwt.verifyToken],
    languageController.getAllSongsInSpanish
  );

  app.get(
    "/api/V3/songs/english",
    [authJwt.verifyToken],
    languageController.getAllSongsInEnglish
  );
};
