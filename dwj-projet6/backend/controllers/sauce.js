const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
/*Capture et enregistre l'image, analyse la sauce en utilisant une chaîne de caractères et
l'enregistre dans la base de données, en définissant correctement son image URL.*/
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  console.log(sauceObject);
  const sauce= new Sauce({
    ...sauceObject,
imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
/*Remet les sauces aimées et celles détestées à 0, et les sauces usersliked et celles usersdisliked
aux tableaux vides.*/
  likes: 0,
  dislikes: 0,
  usersLiked: [],
  usersDisliked: [],
});
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
// Renvoie le tableau de toutes les sauces dans la base de données
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
// Renvoie la sauce avec l'ID fourni

  Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  
  exports.modifySauce = (req, res, next) => {
//Met à jour la sauce avec l'identifiant fourni.  

const sauceObject = req.file ?
{
//Si une image est téléchargée, capturez-la et mettez à jour l'image URL des sauces.
  ...JSON.parse(req.body.sauce),
  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
/*Si aucun fichier n'est fourni, les détails de la sauce figurent directement dans le
corps de la demande*/
}: { ...req.body };
//Si un fichier est fourni, la sauce avec chaîne est en req.body.sauce.

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Recette modifiée !'}))
  .catch(error => res.status(400).json({ error }));
};
  
  exports.deleteSauce = (req, res, next) => {
// Supprime la sauce avec l'ID fourni.

    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Recette supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
  
 /* exports.like = (req, res, next) => {
// Définit le statut "j'aime" pour userID fourni

const sauceObject = JSON.parse(req.body.sauce);
Sauce.updateOne({ _id: req.params.id })
  .then(() => { 
    if (sauceObject.likes === 1) {

    }else if (sauceObject.likes === -1){

    }
  }else {
    
  }
  .catch(error => res.status(400).json({ error }));
}; */