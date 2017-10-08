var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 8080;


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection;

if (process.env.JAWSDB_URL) {    // for heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Tb2xibNwIF!4E$@NE!",
        database: "burgers_db"
    });
}

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.handlebars page
app.get("/", function (req, res) {
    connection.query("SELECT * FROM burgers;", function (err, data) {
        if (err) {
            //send back error
            return res.status(500).end();
        }

        res.render("index", {burgers: data});
    });
});

// Create a new burger
app.post("/api/burgers", function (req, res) {
    connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, false)", [req.body.burger_name], function (err, result) {
        if (err) {
            // send back error
            return res.status(500).end();
        }

        // Send id of new burger
        res.json({id: result.insertId});
        console.log({id: result.insertId});
    });
});


// update burger
app.put("/api/burgers/:id", function (req, res) {
    connection.query("UPDATE burgers SET devoured = true WHERE id = ?", [req.params.id], function (err, result) {
        if (err) {
            //send back error
            return res.status(500).end();
        } else if (result.changedRows === 0) {
            // send back 404
            return res.status(404).end();
        } else {
            //send all is ok
            res.status(200).end();
        }
    });
});

app.listen(port, function () {
    console.log("Listening on PORT " + port);
});
