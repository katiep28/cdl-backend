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
  const savings   = 0.44;
  const totalcost = 3.45;
  const id = 1;
  
  connection.query("INSERT INTO usershopheader(id, userid, savings, totalcost) VALUES (?, 1, ?, ?)",
    [id, savings, totalcost],
    // [uuid(), values.savings, values.totalcost],
     
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

//=========================
/*
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");

const app = express();

app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "cdlcheckout"
});

app.post("/createheader", function (request, response) {
  const values = request.body;
  const savings   = 0.44;
  const totalcost = 3.45;
  const id = 1;

    connection.query("INSERT INTO usershopheader(id, userid, savings, totalcost) VALUES (?, 1, ?, ?)",
    [id, savings, totalcost],
    // [uuid(), values.savings, values.totalcost],
     
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

*/

// ============================
// app.post("/createusershop", function (request, response) {
//   const values = request.body;
//   const savings   = 0.44;
//   const totalcost = 3.45;

//   connection.query("INSERT INTO usershopheader(id, userid, savings, totalcost) " + 
//                   "VALUES (?, 1, ?, ?) ",
//                   [uuid(), savings, totalcost],
//                   // [uuid(), values.savings, values.totalcost],
//                   function (err, data) {
//     if (err) {
//       console.log("Error inserting header", err);
//       response.status(500).json({
//         error: err
//       });
//     } else {
//       console.log("Header inserted");
//       response.status(200).send("Header added");
//     };
//   });

// });


// module.exports.shop = serverless(app);


