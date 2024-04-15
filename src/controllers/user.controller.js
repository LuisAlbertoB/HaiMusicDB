exports.allAccess = (req, res) => {
    res.status(200).send("Contenedor publico.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Contenedor de usuario.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Contenedor de administradores.");
  };