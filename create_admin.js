const queries = require('./queries')
const connection = require('./connection')
const bcrypt = require("bcryptjs")

const saltRounds = 10; 

function is_admin_exist(){
    const sql = queries.filter_admin
   

    let check = connection.query(sql,(err,result)=>{
        if(err) throw err
        return result
    })


   if(check.length>0){
    return true
   }else{
    return false
   }

    
}

const add_admin = (email,password,name)=>{
let sql= queries.create_admin(email,password,name)
connection.query(sql,(err,result)=>{
    if(err) throw err
    console.log("Admin Created")
})
}

const create_admin=()=>{
let admin = is_admin_exist()
if(!admin){
    bcrypt.hash("admin", saltRounds, function (err, hash) {
        if (err) throw err;
        add_admin("theadmin@gmail.com",hash,"Admin")
    })    
}

}

create_admin()

module.exports = create_admin