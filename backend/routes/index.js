var express = require('express');
var router = express.Router();
var request = require('sync-request');
var favorisModel = require("../models/favoris")



/* GET affiche l'ensemble de la BDD webservice */
router.get('/new-movies', async function(req, res, next) {
  var data = await request('GET','https://api.themoviedb.org/3/discover/movie?api_key=2de7e33839ebb3ee5b0bf306194945b9&language=fr-FR&sort_by=popularity.desc&page=1&include_image_language=fr-FR,null');
  var dataParse = JSON.parse(data.body);

  // var checkFavoris = await favorisModel.find(
  //   titre : dataParse.results.title;
  // )
  // if (checkFavoris === true){

  // }

  res.json(dataParse.results);
});


/* POST ajout favoris film */
router.post('/addfavoris', async function(req, res, next) {
  var newFavoris = await new favorisModel ({
    image : req.body.imgFetch,   
    titre : req.body.nameFetch,
  });

  var movieSave = await newFavoris.save();

  res.json({result:true});
});


/* POST supprimer favoris film */
router.delete('/supprfavoris/:name', async function(req, res, next) {
  
  await favorisModel.deleteOne(
    {titre : req.params.name});

  res.json({result:true});
});


/* GET affiche l'ensemble des favoris */
router.get('/favorislist', async function(req, res, next) {
  var movies = await favorisModel.find()

  res.json(movies);
});




module.exports = router;
