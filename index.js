const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "suitsup",
  });
  app.post("/create", (req, res) => {
    const companyName = req.body.companyName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email =  req.body.email;
    const password =  req.body.password;

    db.query(
      "INSERT INTO suitsup.users (companyName, firstName, lastName, email, password) VALUES (?,?,?,?,?)",
      [companyName,firstName, lastName, email, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
  app.post("/login", (req, res) => {
    const email =  req.body.email;
    const password =  req.body.password;

    db.query(
      "SELECT * FROM suitsup.users WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          console.log({err: err});
        } 
        if(result.length > 0){
          res.send(result);
        }else{
          res.send({message: "Wrong email/ password combination!"});
        }
      }
      
    );
  });
app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });