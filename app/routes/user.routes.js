const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const spinncontroller = require("../controllers/spinn.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/all", controller.allAccess);
  app.get("/api/getAllParts", controller.allparts);
  app.get("/api/getFrontAllParts", controller.allpartsFront);
  app.post("/api/getAllEnquiry", spinncontroller.allenquiry);
  app.get("/api/getSelectEnquiry/:status", spinncontroller.SelectEnquiry);
  app.get("/api/getAllUser", spinncontroller.alluser);
  app.get('/api/getDeleteParts/:id', controller.DeleteParts);
  app.get('/api/getdeleteUser/:id', spinncontroller.DeleteUser);
  app.get('/api/getDeletEnquiry/:id', spinncontroller.DeleteEnquiry);
  app.get('/api/getParticularParts/:id', controller.SelectParticularParts);

  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
