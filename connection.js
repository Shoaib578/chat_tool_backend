var mysql = require('mysql');
const queries = require('./queries');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat_tool"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    //Database creation
    con.query(queries.database_sql, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    //User Table creation

    con.query(queries.user_table_sql, function (err, result) {
        if (err) throw err;
        console.log("User Table created");
      });

    //Channel Table creation

      con.query(queries.channel_table_sql, function (err, result) {
        if (err) throw err;
        console.log("Channel Table created");
      });

    //Messages Table creation

      con.query(queries.messages_table_sql, function (err, result) {
        if (err) throw err;
        console.log("Messages Table created");
      });

    //Replies Table creation

      con.query(queries.replies_table_sql, function (err, result) {
        if (err) throw err;
        console.log("Replies Table created");
      });
  });
module.exports = con;