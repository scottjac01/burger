// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Burgers = require("../models/burgers.js");


// Routes
// =============================================================
module.exports = function(app) {

// Use the query param to figure out what kind of search to do
app.get('/burger', function(req,res) {
 Burgers.findAll({}).then(function(data){
  var hbsObject = {burger : data}
  console.log(hbsObject)
  res.render('index', hbsObject);
  });

app.post('/burger/create', function(req,res) {

  var burger = req.body;
  Burgers.create({
    burger_name: burger.burger_name,
    devoured: burger.devoured
  }, function(data){
    res.redirect('/burger')
  });
});

app.put('/burger/update/:id', function(req,res) {
  var condition = 'id = ' + req.params.id;

  console.log('condition', condition);

  Burgers.update({'devoured' : req.body.devoured}, condition, function(data){
    res.redirect('/burger');
  });
});
