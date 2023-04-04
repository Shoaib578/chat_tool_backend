const express = require('express')
const app = express()
const connection = require('./connection')
const upload = require('express-fileupload')
const create_admin = require('./create_admin')
const http = require('http').Server(app);
const queries = require('./queries')

const cors = require('cors');
app.use(express.static("public"));
app.use(cors());
app.use(upload())

app.use(express.json());




const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
});


//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log("user connected",socket.id)

  
    socket.on("message",(data)=>{

        console.log(data)
        let sql = queries.send_message(data.message.message,data.message.channel_id,data.message.user_id)
        connection.query(sql,(err,result)=>{
           if(err) throw err
        socket.broadcast.emit("receive_message",data)

        })
    })


    socket.on("reply",(data)=>{

        console.log(data)

        let sql = queries.insert_reply(data.channel_id,data.reply_message,data.replied_by,data.message_id)
        connection.query(sql,(err,result)=>{
           if(err) throw err
        socket.broadcast.emit("receive_replies",data)

        })
       
    })
   
});




const user = require('./routes/apis/user')
app.use('/apis/user',user)


const channel = require('./routes/apis/channel')
app.use('/apis/channel',channel)

const message = require('./routes/apis/message')
app.use('/apis/message',message)

const admin = require('./routes/apis/admin')
app.use('/apis/admin',admin)




const port = process.env.PORT || 5000;

 http.listen(port, () => {
    console.log(`Server listening on ${port}`);
}) 

