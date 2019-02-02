const db = require('../models/index');

module.exports = function (app) {

  app.get('/api/login', function (req, res) {
    db.login.find({})
      .then(function (dblogin) {
        res.json(dblogin);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/login', function (req, res) {
    console.log(req.body)
    db.login.create({
      username: req.body.username,
      password: req.body.password
    }).then(function (data) {
      res.json(data);
    })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.get('/api/recipe', function (req, res) {
    db.recipe.find({})
      .then(function (dbrecipe) {
        res.json(dbrecipe);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/recipe', function (req, res) {
    db.recipe.create({
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions
    }).then(function (dbrecipe) {
      res.json(dbrecipe);
    })
      .catch(function (err) {
        res.json(err);
      });
  });

};