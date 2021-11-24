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
  app.post("/createstartup", (req, res) => {
    const companyName = req.body.companyName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email =  req.body.email;
    const password =  req.body.password;

    db.query(
      "INSERT INTO suitsup.startups (companyName, firstName, lastName, email, password) VALUES (?,?,?,?,?)",
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
  app.post("/createinvestor", (req, res) => {
    const companyName = req.body.companyName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email =  req.body.email;
    const password =  req.body.password;

    db.query(
      "INSERT INTO suitsup.investors (companyName, firstName, lastName, email, password) VALUES (?,?,?,?,?)",
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
  app.post("/startupslogin", (req, res) => {
    const email =  req.body.email;
    const password =  req.body.password;

    db.query(
      "SELECT * FROM suitsup.startups WHERE email = ? AND password = ?",
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
  app.post("/investorslogin", (req, res) => {
    const email =  req.body.email;
    const password =  req.body.password;

    db.query(
      "SELECT * FROM suitsup.investors WHERE email = ? AND password = ?",
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
  app.get("/employees", (req, res) => {
    db.query("SELECT * FROM suitsup.investors", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
 
app.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
      "UPDATE suitsup.investors SET wage = ? WHERE id = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
});
 
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM suitsup.investors WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });
