//Database creation and table creation related Queries Start
var database_sql = "CREATE DATABASE IF NOT EXISTS chat_tool";
var user_table_sql = "CREATE TABLE IF NOT EXISTS users (user_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), email VARCHAR(255),profile_image VARCHAR(350),password VARCHAR(255),is_admin INT)"
var channel_table_sql = "CREATE TABLE IF NOT EXISTS channels (channel_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(1000),created_by INT REFERENCES users(user_id))"
var messages_table_sql = "CREATE TABLE IF NOT EXISTS messages (message_id INT AUTO_INCREMENT PRIMARY KEY,message VARCHAR(1000), channel INT REFERENCES channels(channel_id), added_by INT REFERENCES users(user_id))"
var replies_table_sql = "CREATE TABLE IF NOT EXISTS replies (reply_id INT AUTO_INCREMENT PRIMARY KEY,replied_by INT REFERENCES users(user_id),msg_id INT REFERENCES users(message_id),reply_message VARCHAR(1000),channel INT REFERENCES channels(channel_id))"
//Database creation and table creation related Queries End




//User Table related queries
var filter_user_by_email = (email)=>"SELECT * FROM users WHERE email='"+email+"'"
var insert_user = (email,password,name,profile_image)=>`INSERT INTO users (email,password,name,profile_image,is_admin) VALUES('${email}','${password}','${name}','${profile_image}',0)`


//Channel related queries
var insert_channel = (user_id,channel_name)=>`INSERT INTO channels (created_by,name) VALUES(${user_id},'${channel_name}')`
var get_all_channels = "SELECT * FROM channels"
var get_channel_by_id =(channel_id)=> `SELECT * FROM channels WHERE channel_id=${channel_id}`
var delete_channel =(channel_id)=> `DELETE FROM channels WHERE channel_id=${channel_id}`

//Messages related queries
var send_message = (message,channel_id,user_id)=> `INSERT INTO messages(message,channel,added_by) VALUES('${message}',${channel_id},${user_id})`
var get_messages =(channel_id)=>`SELECT * FROM messages LEFT JOIN users on users.user_id=messages.added_by WHERE channel=${channel_id}`

//Replies Related queries
var insert_reply = (channel_id,reply_message,replied_by,message_id)=>`INSERT INTO replies(replied_by,msg_id,reply_message,channel) VALUES(${replied_by},${message_id},'${reply_message}',${channel_id})`
var get_replies =(channel_id) =>`SELECT * FROM replies LEFT JOIN users on users.user_id=replies.replied_by WHERE replies.channel=${channel_id}`


//Admin related queries 
var get_all_users = "SELECT * FROM users WHERE is_admin=0"
var delete_user =(user_id)=> `DELETE FROM users WHERE user_id=${user_id}`
var get_all_messages = "SELECT * FROM messages"
var delete_message = (message_id)=>`DELETE FROM messages WHERE message_id=${message_id}`
var get_all_replies = "SELECT * FROM replies"
var delete_reply = (reply_id)=>`DELETE FROM replies WHERE reply_id=${reply_id}`

var create_admin =(email,password,name)=> `INSERT INTO users(email,password,name,is_admin) VALUES('${email}','${password}','${name}',1)`
var filter_admin = "SELECT * FROM users WHERE is_admin =1"


module.exports = {
    database_sql,
    user_table_sql,
    channel_table_sql,
    messages_table_sql,
    replies_table_sql,
    filter_user_by_email,
    insert_user,
    insert_channel,
    get_all_channels,
    get_channel_by_id,
    send_message,
    get_messages,
    delete_channel,
    get_all_users,
    delete_user,
    get_all_messages,
    delete_message,
    get_replies,
    insert_reply,
    create_admin,
    filter_admin,
    get_all_replies,
    delete_reply
}