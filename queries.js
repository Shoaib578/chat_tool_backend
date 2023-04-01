//Database creation and table creation related Queries Start
var database_sql = "CREATE DATABASE IF NOT EXISTS chat_tool";
var user_table_sql = "CREATE TABLE IF NOT EXISTS users (user_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), email VARCHAR(255),password VARCHAR(255))"
var channel_table_sql = "CREATE TABLE IF NOT EXISTS channels (channel_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(1000),created_by INT REFERENCES users(user_id))"
var messages_table_sql = "CREATE TABLE IF NOT EXISTS messages (message_id INT AUTO_INCREMENT PRIMARY KEY,message VARCHAR(1000), channel INT REFERENCES channels(channel_id), added_by INT REFERENCES users(user_id))"
var replies_table_sql = "CREATE TABLE IF NOT EXISTS replies (reply_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(1000),replied_by INT REFERENCES users(user_id),msg_id INT REFERENCES users(message_id),reply_message VARCHAR(1000))"
//Database creation and table creation related Queries End


//User Table related queries

var select_all_users = "SELECT * FROM users";


module.exports = {database_sql,user_table_sql,channel_table_sql,messages_table_sql,replies_table_sql,select_all_users}