const queries = require('./queries')
const connection = require('./connection')
const bcrypt = require("bcryptjs")

const saltRounds = 10; 

function create_admin(){
    const sql = queries.filter_admin
   

     connection.query(sql,(err,result)=>{
        if(err) throw err
        if(result.length<1){
            bcrypt.hash("admin", saltRounds, function (err, hash) {
                if (err) throw err;
                add_admin("theadmin@gmail.com",hash,"Admin")
            })
        }
         
    })

   
   

    
}

const add_admin = (email,password,name)=>{
let sql= queries.create_admin(email,password,name)
connection.query(sql,(err,result)=>{
    if(err) throw err
    console.log("Admin Created")
})
}



create_admin()

module.exports = create_admin