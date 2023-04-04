const router = require('express').Router();
const bcrypt = require("bcryptjs")
const queries = require('../../queries')
const connection = require('../../connection')

const saltRounds = 10; 





router.post('/send_message',(req,res)=>{
     let message = req.body.message
     let user_id = req.body.user_id
     let channel_id = req.body.channel_id

     let sql = queries.send_message(message,channel_id,user_id)
     connection.query(sql,(err,result)=>{
        if(err) throw err

        return res.send({
            "status":"created",
            "sent":true
        })
     })
})

router.get('/get_messages',(req,res)=>{
    let channel_id = req.query.channel_id
  
    console.log(channel_id)
    let messages_sql = queries.get_messages(channel_id)
    let reply_sql = queries.get_replies(channel_id)
    connection.query(messages_sql,(err,messages)=>{
        if(err) throw err

        connection.query(reply_sql,(err,replies)=>{
            if(err) throw err
            return res.send({
                "status":"success",
                "data":messages,
                "replies":replies
            })
        
        })
      
    })
})


router.get("/get_replies",(req,res)=>{
    let message_id = req.query.message_id
    let sql = queries.get_replies(message_id)
    connection.query(sql,(err,result)=>{
        if(err) throw err
        return res.send({
            "status":"success",
            "data":result
        })
    })
})

module.exports = router;