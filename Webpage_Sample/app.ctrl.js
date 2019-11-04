// app.ctrl.js
// Peter Johnson
// Nov 4, 2019

const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const Model = require('./app.model.js')

// mustache setup
app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// ************************* CONTROLLER ACTIONS ****************************

// *** Add coffee ***
// display the form to add new coffee
app.get('/addform', function(req,res) {
	// Define the 'renderPage' function
	function renderPage(coffeeArray) {
		res.render('main_page', {addcoffee: true, R_coffee: coffeeArray});
	}

	// Get the coffees from the database
	Model.getAllCoffee(renderPage);
});

// adds the new coffee to the database
app.get('/addcoffee', function(req,res) {
	 // Define the 'renderPage' function
	 function renderPage(coffeeArray) {
		res.render('main_page', {addcoffee: false, R_coffee: coffeeArray});
		}
	
	// Get coffee from the database, using the renderPage function as a callback.
	function getCoffee() { Model.getAllCoffee(renderPage); }
	
	// Add the coffee to the database
	Model.addCoffee(req.query, getCoffee);
});

// *** Edit coffee ***
// display the form to add new coffee
app.get('/editform/:id', function(req,res) {
	// Define the 'renderPage' function
	function renderPage(coffeeArray) {
		res.render('main_page',
		{editcoffee: true,
		editid: req.params.id,
		formdata : coffeeArray.filter(x => (x.rowid == req.params.id))[0],
		R_coffee: coffeeArray});
	}

	// Get the coffees from the database
	Model.getAllCoffee(renderPage);
});

// adds the new coffee to the database
app.get('/editcoffee/:id', function(req,res) {
	 // Define the 'renderPage' function
	 function renderPage(coffeeArray) {
		res.render('main_page', {addcoffee: false, R_coffee: coffeeArray});
		}
	
	// Get coffee from the database, using the renderPage function as a callback.
	function getCoffee() { Model.getAllCoffee(renderPage); }
	
	// Add the coffee to the database
	Model.editCoffee(req.query, req.params.id, getCoffee);
});

// *** Remove coffee ***
// remove a coffee from the database
app.get('/remove/:id', function(req,res) {

	// Define the 'renderPage' function
	function renderPage(coffeeArray) {
		res.render('main_page', { R_coffee: coffeeArray});
	}

	// Get coffee from the database, using the renderPage function as a callback.
	function getCoffee() { Model.getAllCoffee(renderPage); }

	// Remove the coffee from the database
	Model.removeCoffee(req.params.id, getCoffee);
});

// *** Default ***
// default action: render the main page.
app.get('/', function(req,res) {
	
	function renderPage(coffeeArray) {
		res.render('main_page', { R_coffee: coffeeArray});
	}
	
	// Get the coffees from the database
	Model.getAllCoffee(renderPage);
});

// catch-all router case intended for static files
app.get(/^(.+)$/, function(req,res) {
  res.sendFile(__dirname + req.params[0]);
});

app.listen(8081, function() { console.log("server listening..."); } );
