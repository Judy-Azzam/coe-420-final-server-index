const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fileUpload = require('express-fileupload');
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`../coe-420-final/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
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
  app.post("/hasPosted", (req, res) => {
    const email =  req.body.email;
    db.query(
      "SELECT blog FROM suitsup.startups WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log({err: err});
        } 
        if(result.length > 0){
          res.send(result);
        }else{
          res.send({message: "Error 300"});
        }
      }
      
    );
  });
  app.post("/getPictureDescription", (req, res) => {
    const email =  req.body.email;
    db.query(
      "SELECT blogText FROM suitsup.startups WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log({err: err});
        } 
        if(result.length > 0){
          res.send(result);
        }else{
          res.send({message: "Error 600"});
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
  app.get("/investors", (req, res) => {
    db.query("SELECT * FROM suitsup.investors", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
app.get("/startups", (req, res) => {
  db.query("SELECT * FROM suitsup.startups", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/blogs", (req, res) => {
  db.query("SELECT companyName, blog, blogText FROM suitsup.startups", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/postblog", (req, res) => {
  const email = req.body.email;
  const blog = req.body.blog;
  db.query(
    "UPDATE suitsup.startups SET blog = ? WHERE email = ?",
    [blog, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.put("/postblogtext", (req, res) => {
  const email = req.body.email;
  const blogText = req.body.blogText;
  db.query(
    "UPDATE suitsup.startups SET blogText = ? WHERE email = ?",
    [blogText, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.put("/editstartupprofile", (req, res) => {
  const email = req.body.email;
  const companyWebsite = req.body.companyWebsite;
  const numofPeople = req.body.numofPeople;
  const industryName = req.body.industryName;
  const emirateName = req.body.emirateName;
  const companyDesc= req.body.companyDesc;
  db.query(
    "UPDATE suitsup.startups SET companyWebsite = ?, numofPeople = ?, industryName = ?, emirateName = ?, companyDesc = ? WHERE email = ?",
    [companyWebsite, numofPeople, industryName, emirateName, companyDesc, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/editinvestorprofile", (req, res) => {
  const email = req.body.email;
  const companyWebsite = req.body.companyWebsite;
  const phoneNumber = req.body.phoneNumber;
  
  db.query(
    "UPDATE suitsup.startups SET companyWebsite = ?, phoneNumber = ? WHERE email = ?",
    [companyWebsite, phoneNumber, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/deleteinvestor/:email", (req, res) => {
const email = req.params.email;
db.query("DELETE FROM suitsup.investors WHERE email = ?", email, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    res.send(result);
  }
});
});

app.delete("/deletestartup/:email", (req, res) => {
const email = req.params.email;
db.query("DELETE FROM suitsup.startups WHERE email = ?", email, (err, result) => {
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
