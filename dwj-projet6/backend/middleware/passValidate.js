const schema = require("../models/password");

module.exports = (req, res, next) => {
    
    if (!schema.validate) {
        
      res.status(400).json(alert("Votre mot de passe n'est pas assez sécurisé !"));

    } else {
     
      next();
    }
  };
  
