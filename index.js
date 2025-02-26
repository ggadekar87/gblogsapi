const express = require('express');
const app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
    ssl:true,
    host: "127.0.0.1",
    user: "gtecpxcn_ggadekar87",
    password: "G@nesh1987!",
    database: "`gtecpxcn_notebook`"
  });
  
app.get('/', (req, res) => {

    
    res.send('Hello, Express!');
  });






const port = process.env.PORT || 3000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});