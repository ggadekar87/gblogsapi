const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
const db = mysql.createConnection({
  localAddress: "162.254.39.113",
  host: '127.0.0.1', // e.g. 'localhost' or an external IP/domain
  user: 'gtecpxcn_ggadekar87', // Your MySQL username
  password: 'G@nesh1987!', // Your MySQL password
  database: 'gtecpxcn_notebook', // Your MySQL database name
  port: 3306, // Default MySQL port
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

app.get('/', (req, res) => {
  res.send('Connected to MySQL database with id ' + db.threadId);
});

app.get('/gblogsapi', (req, res) => {
  res.send('Connected to MySQL database with id ' + db.threadId);
});

app.get('/gblogsapi/visit', (req, res) => {
  var sql = "insert into UserLocation (LastName,FirstName,Address,City,Latitude,Longitude,CreateDate,UpdateDate) values('Gadekar','Ganesh','Pune','Pune','12200','999888',NOW(),NOW())";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send("1 record inserted");
  });
});


app.post("/gblogsapi/signup", (req, res) => {
  const { email, fullName, given_name, picture, userRole } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  // Check if email exists
  const checkQuery = "SELECT * FROM User WHERE email = ?";
  db.query(checkQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Database error", error: err });
    }
    if (result.length > 0) {
      return res.status(409).send({ message: "Email already registered" });
    }
    // Insert new user
    const insertQuery =
      "INSERT INTO User (Email, FullName, GivenName, Gender, Phone, City, Picture,Photo,UserRole,EmailVerified,Status,CreateDate) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?, NOW())";
    db.query(insertQuery, [email, fullName, given_name, "", "", "", picture, '', userRole, true, true], (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Failed to insert user", error: err });
      }
      res.status(201).send({ message: "User registered successfully" });
    });
  });
});

const port = process.env.PORT || 3000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});