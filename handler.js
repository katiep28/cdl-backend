const express = require("express"); //identifies the code that should be run
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const uuid = require("uuid/dist/v4");
const app = express();

app.use(cors());
//Allows express to use jason data sent that is sent on the body of any requests
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "cdlcheckout"
});

app.post("/createheader", function (request, response) {
  const values = request.body;
  const userid = 1;
  
  connection.query("INSERT INTO usershopheader(id, userid, savings, totalcost) VALUES (uuid(), ?, ?, ?)",
    [userid, values.savings, values.totalcost],
     
    function (err, data) {
      if (err) {
        console.log("Error Inserting tasks", err);
        response.status(500).json({
          error: err
        });
      } else {
        response.status(201).send("Received a request to insert data ");
      };
    }); 
});

app.post("/createitems", function (request, response) {
  const values = request.body;
  const itemid = 1;
  const usershopheaderid = "12f69622-b3b4-11ea-85ff-06c7454f588e";
  const itemname = "apples";
  const qty = 3;
  const price = 0.15
  
  connection.query("INSERT INTO usershopitems(id, usershopheaderid, itemname, qty, price) VALUES (?, ?, ?, ?, ?)",
    [itemid, usershopheaderid, itemname, qty, price],
     
    function (err, data) {
      if (err) {
        console.log("Error Inserting tasks", err);
        response.status(500).json({
          error: err
        });
      } else {
        response.status(201).send("Received a request to insert data ");
      };
    }); 
});

module.exports.shop = serverless(app);

