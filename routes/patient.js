const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://postgres:inlove1982@localhost:5432/project2";
const pool = new Pool({connectionString: connectionString});

pool.connect();

exports.list = function(req, res) {
  pool.query("SELECT * FROM patient", function(err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.render("patient/list", { title: "Patients", data: result.rows });
  });
};

exports.add = function(req, res) {
  res.render("patient/add", { title: "Add Patient" });
};

exports.edit = function(req, res) {
  // get the Postgres record ID from the request 'params' body
  var id = req.params.id;

  pool.query("SELECT * FROM patient WHERE id=$1", [id], function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.render("patient/edit", { title: "Edit Patient", data: result.rows });
  });
};

exports.save = function(req, res) {
  var cols = [req.body.user_id, req.body.name, req.body.gender, req.body.birthdate, req.body.phone, req.body.email, 
             req.body.occupation];
    pool.query("INSERT INTO patient(user_id, name, gender, birthdate, phone, email, occupation, date_added) VALUES($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING * ",
    cols,
    function(err, result) {
      if (err) {
        console.log("Error. Not Saved! : %s ", err);
      }
      res.redirect("/patient");
    }
  );
};

exports.update = function(req, reas) {
  // Postgres table column names go here
  var cols = [
    req.body.name, 
    req.body.gender, 
    req.body.birthdate, 
    req.body.phone, 
    req.body.email,
  	req.body.occupation
  ];

  pool.query(
    "UPDATE patient SET name=$1, gender=$2, birthdate=$3, phone=$4, email=$5, occupation=$6 WHERE id=$7",
    cols,
    function(err, result) {
      if (err) {
        console.log("Error. Updating : %s ", err);
      }
      res.redirect("/patient");
    }
  );
};

exports.delete = function(req, res) {
  var id = req.params.id;

  pool.query("DELETE FROM patient WHERE id=$1", [id], function(err, rows) {
    if (err) {
      console.log("Error deleting : %s ", err);
    }
    res.redirect("/patient");
  });
};

exports.index = function(req, res) {
  res.render("views/index", { title: "Add Patient" });
};