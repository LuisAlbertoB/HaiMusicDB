const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (existingUser) {
      if (existingUser.user_name === req.body.user_name) {
        return res.status(400).send({ message: "El nombre de usuario ya está en uso." });
      }
      if (existingUser.email === req.body.email) {
        return res.status(400).send({ message: "El correo electrónico ya está en uso." });
      }
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({ message: `El rol ${req.body.roles[i]} no existe.` });
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;








