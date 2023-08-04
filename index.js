// importing from env 
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const port = process.env.PORT || 4000;

//creating mongodb database 
// connecting web server

const url = process.env.url;
 function connect(){
    try{
        mongoose.connect(url);
        console.log("connected")
    }
    catch(err){
        console.log(err);
    }
}
connect();

app.get('/', (req,res)=>{
    res.send('good evening')
})
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
});