const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No se ha proporcionado el token" });
  }

  jwt.verify(token, config.secret)
    .then(decoded => {
      req.userId = decoded.id;
      next();
    })
    .catch(err => {
      res.status(401).send({ message: "Token no válido" });
    });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    const isAdmin = roles.some(role => role.name === "admin");
    if (isAdmin) {
      next();
    } else {
      res.status(403).send({ message: "Se requiere rol de administrador" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;