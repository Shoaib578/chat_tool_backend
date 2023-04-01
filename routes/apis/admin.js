const router = require('express').Router();
const bcrypt = require("bcryptjs")
const queries = require("../../queries")
const connection = require("../../connection")
const saltRounds = 10; 

router.get('/get_all_users',(req,res)=>{
    let sql = queries.get_all_users
    connection.query(sql,(err,result)=>{
        if(err)throw err

        return res.send({
            "status":"success",
            "data":result
        })
    })
})

router.get('/delete_user',(req,res)=>{
    let user_id =req.query.user_id
    let sql = queries.delete_user(user_id)
    connection.query(sql,(err,result)=>{
        if(err)throw err
        return res.json({
            "status":"user deleted",
            "is_deleted":true
        })
    })
})


router.get('/get_all_channels',(req,res)=>{
    let sql = queries.get_all_channels
    connection.query(sql,(err,result)=>{
        if(err)throw err
        return res.send({
            "status":"success",
            "data":result
        })
    })
})

router.get('/delete_channel',(req,res)=>{
    let channel_id = req.query.channel_id
    let sql = queries.delete_channel(channel_id)
    connection.query(sql,(req,res)=>{
        if(err)throw err;
        
        return res.json({
            "status":"channel deleted",
            "is_deleted":true
        })
    })
})


router.get('/get_all_messages',(req,res)=>{
   let sql = queries.get_all_messages
   connection.query(sql,(req,res)=>{
    if(err)throw err
    return res.json({
        "status":"success",
        "data":result
    })
   }) 
})


router.get('/delete_message',(req,res)=>{
    let message_id = req.query.message_id
    let sql = queries.delete_message(message_id)

    connection.query(sql,(req,res)=>{
        if(err)throw err;
        
        return res.json({
            "status":"message deleted",
            "is_deleted":true
        })
    })
})

module.exports = router;