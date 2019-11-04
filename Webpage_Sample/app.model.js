// app.model.js
// Peter Johnson
// Nov 4, 2019

var sqlite3 = require("sqlite3").verbose();
var db_coffee = new sqlite3.Database("coffee.db"); //Table = Coffee (Brand, Bean, Price, Inventory)

// select all from db_coffee, returns them using callback.
function getAllCoffee(callback)
{
  db_coffee.all("SELECT rowid, * FROM Coffee",
         function(err,results) { callback(results); });
}

// delete a coffee with a given id
function removeCoffee(id,callback)
{
  db_coffee.run("DELETE FROM Coffee WHERE rowid=?", id,
         function(err) { callback(); });
}

// a new coffee into the table
function addCoffee(coffee_data,callback)
{
  db_coffee.run("INSERT INTO Coffee VALUES (?,?,?,?)",
         [coffee_data.Brand, coffee_data.Bean, coffee_data.Price, coffee_data.Inventory],
         function(err) { callback(); });
}

// edit an existing coffee with a given id
function editCoffee(coffee_data,id,callback)
{
  db_coffee.run("UPDATE Coffee SET Brand=?,Bean=?,Price=?,Inventory=? WHERE rowid=?",
         [coffee_data.Brand, coffee_data.Bean, coffee_data.Price, coffee_data.Inventory, id],
         function(err) { callback(); });
}

// export the functions
module.exports = {
	getAllCoffee,
	removeCoffee,
	addCoffee,
	editCoffee
};
