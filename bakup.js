var express = require("express");
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://postgres:inlove1982@localhost:5432/project2";
const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", home);



app.get("/home", getPatients)


app.get("/getPatient", getPatient);

app.listen(app.get("port"), function() {
	console.log("Now listening on port: ", app.get("port"));
});

function home() {
	console.log("Home function is called");
	res.render('index');
}

function getPatient(req, res) {
	console.log("Function getPatients is called")

	var id = req.query.id
	console.log("Requesting person with id: ", id)

	getPatientFromDb(id, function(error, result) {
		console.log("Back from database with result: ", result)
		
		if (error || result == null || result.length !=1) {
			res.status(500).json({success:false, data: error})
		} else {
			res.json(result[0])
		}
	})
}

function getPatientFromDb(id, callback) {
	console.log("getPatientFromDb called with id: ", id)

	var sql = "SELECT * FROM patient WHERE id = $1::int";
	var params = [id]

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("An error occurred with the DB")
			console.log(err)
			callback(err, null)
		}

		console.log("Found DB result: " + JSON.stringify(result.rows))
		callback(null, result.rows)
	})
}


function getPatients(req, res) {
	console.log("Received a request for the home page");
	var name = getCurrentLoggedInUserAccount();
	var emailAddress = "john@email.com";
	var params = {username: name, email: emailAddress};
	/*getPatientsFromDb(req, res);*/
	
	getPatientsFromDb(function(error, result) {
		console.log("Back from database with result: ", result)
		
		if (error || result == null || result.length !=1) {
			res.status(500).json({success:false, data: error})
		} else {			
			res.render("home", params, result.rows);
		}
	})


}


function getPatientsFromDb(callback) {
	console.log("getPatientFromDb called")

	var sql = "SELECT * FROM patient";

	pool.query(sql, function(err, result){

		if (err) {
			console.log("An error occurred with the DB")
			console.log(err)
			callback(err, null)
		}

		console.log("Found DB result: " + JSON.stringify(result.rows))
		callback(null, result.rows)
	})
}


function getCurrentLoggedInUserAccount() {
	return "Marvin Enamorado";
}