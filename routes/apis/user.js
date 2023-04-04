const router = require('express').Router();
const bcrypt = require("bcryptjs")

const saltRounds = 10; 
const connection = require('../../connection')
const queries = require('../../queries')


let save_file = (image)=>{
    let profile_image=image
       profile_image.mv('public/uploads/'+profile_image.name,function(err){
           if(err){
               res.send(err)
           }
       })
}


//signin api 
router.route('/signin').post((req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    console.log("Hello")
    let sql = queries.filter_user_by_email(email)
    
    connection.query(sql, function (err, data) {
        if (err) throw err;
        if(data.length > 0) {
            console.log(data)
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) throw err;
                if(result == false){
                    return res.json({
                        "status":"invalid email or password",
                        "is_loggedin":false
                        
                    })
                }else{
                    return res.json({
                        "status":"logged in",
                        "is_loggedin":true,
                        "user":data[0]
                        
                    })
                }
              
            
            })

        }else{
            return res.json({
                "status":"invalid email or password",
                "is_loggedin":false
                
            })
        }
      });
   
})


//signup api

router.route('/signup').post((req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let profile_image = req.files.profile_image;
    console.log(profile_image)
    let user = queries.filter_user_by_email(email)

    connection.query(user, function (err, result) {
        if (err) throw err;
        if(result.length<1){
            save_file(profile_image)
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) throw err;
                let sql = queries.insert_user(email, hash, name,profile_image.name);
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    return res.json({
                        "status":"registered",
                        "is_registered":true
                    })
                })
            })
        }else{
            return res.json({
                "status":"user already exists",
                "is_registered":false
            })
        }
      });


})

module.exports = router;