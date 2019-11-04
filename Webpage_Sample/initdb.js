// initdb.js
// Peter Johnson
// Nov 4, 2019

// Run first to initialize the database.

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("coffee.db");

db.serialize(function() {
	
	// create Coffee table, after dropping any existing Coffee tables.
	db.run("DROP TABLE IF EXISTS Coffee");
	db.run("CREATE TABLE Coffee (Brand TEXT, Bean TEXT, Price REAL, Inventory REAL)");
	
	// insert records into the Coffee table
	db.run("INSERT INTO Coffee VALUES (?,?,?,?)", ['Bobs Coffee','Robusta','10.00','250']);
	db.run("INSERT INTO Coffee VALUES (?,?,?,?)", ['Gormet Deluxe','Arabica','25.00','20']);
	db.run("INSERT INTO Coffee VALUES (?,?,?,?)", ['Duncan Hills','Arabica','20.00','100']);
	db.run("INSERT INTO Coffee VALUES (?,?,?,?)", ['Instant Coffee','Robusta','2.00','50']);
	
});