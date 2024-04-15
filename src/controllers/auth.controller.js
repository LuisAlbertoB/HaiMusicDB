const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {

    const user = new User({
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      cellphone: req.body.cellphone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    const savedUser = await user.save();

    let roles = [];
    if (req.body.roles) {
      roles = await Role.find({ name: { $in: req.body.roles } });
    } /* else {
      const defaultRole = await Role.findOne({ name: "user" });
      roles.push(defaultRole);
    }
 */
    savedUser.roles = roles.map(role => role._id);
    await savedUser.save();

    res.send({ message: "El usuario se ha registrado correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ user_name: req.body.user_name }).populate("roles", "-__v");
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "La cotraseña no conside!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400 // 24 hours
    });

    const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());
    res.status(200).send({
      id: user._id,
      user_name: user.user_name,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};