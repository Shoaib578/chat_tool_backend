const express = require('express')
const app = express()
const connection = require('./connection')



const cors = require('cors');
app.use(express.static("public"));
app.use(cors());
app.use(express.json());


const user = require('./routes/apis/user')
app.use('/apis/user',user)


const channel = require('./routes/apis/channel')
app.use('/apis/channel',channel)

const message = require('./routes/apis/message')
app.use('/apis/message',message)

const admin = require('./routes/apis/admin')
app.use('/apis/admin',admin)




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});