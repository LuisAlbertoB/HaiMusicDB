const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
    res.status(200).send("Contenedor publico.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Contenedor de usuario.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Contenedor de administradores.");
  };

  exports.updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!user) {
        return res.status(404).send({ message: "No se encontró el usuario" });
      }
  
      res.send({ message: "El usuario se ha actualizado correctamente", user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return res.status(404).send({ message: "No se encontró el usuario" });
      }
  
      res.send({ message: "El usuario se ha eliminado correctamente" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  