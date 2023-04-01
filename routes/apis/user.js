const router = require('express').Router();
const bcrypt = require("bcryptjs")

const saltRounds = 10; 
const connection = require('../../connection')
const queries = require('../../queries')

router.route('/login').get((req,res)=>{
   
    connection.query(queries.select_all_users, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    return res.json({
        "status":200,
      
    })
})

module.exports = router;