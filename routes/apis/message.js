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
            "created":true
        })
     })
})

router.get('/get_messages',(req,res)=>{
    let channel_id = req.query.channel_id
    

    let sql = queries.get_messages(channel_id)
    connection.query(sql,(err,result)=>{
        if(err) throw err
        return res.send({
            "status":"success",
            "data":result
        })
    })
})


module.exports = router;