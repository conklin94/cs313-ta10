require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

app.use(express.static("public"));

app.set("views", "views");
app.set("views engine", "ejs");

app.listen(port, function() {
    console.log("Port: " + port);
});



app.get("/getPerson", function (){
    const id = app.query.id;

    pool.query('SELECT * FROM person WHERE person_id = $1', [id], (err, res) => {
        if (err) {
          throw err
        }

        console.log('person:', res.rows[0]);
    });
});
