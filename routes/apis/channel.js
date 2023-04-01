const router = require('express').Router();
const connection = require('../../connection');
const queries = require('../../queries');

router.post("/add_channel",(req,res)=>{
    let user_id = req.body.user_id
    let channel_name = req.body.channel_name
    
    let sql = queries.insert_channel(user_id, channel_name)
    connection.query(sql,(err,result)=>{
        if(err)throw err;
        return res.json({
            "status":"channel created",
            "is_created":true
        })
    })

})



router.get('/get_all_channels',(req,res)=>{
    const sql = queries.get_all_channels

    connection.query(sql,(err,result)=>{
        if(err)throw err;
        return res.json({
            "status":"success",
            "data":result
        })
    })
})


router.get('/view_channel_by_id',(req,res)=>{
    let channel_id = req.query.channel_id
    let sql = queries.get_channel_by_id(channel_id)
    connection.query(sql,(err,result)=>{
        if(err)throw err;

        if(result.length>0){
            return res.json({
                "status":"found",
                "data":result[0]
            })
        }else{
            return res.json({
                "status":"not found",
                
            })
        }
      
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



module.exports = router;