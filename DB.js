const mysql = require("mysql");
const name = 'mechanic';
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: name,
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected ${name} database!`);
  });

  module.exports = connection;