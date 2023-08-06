require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const product = require('./models/model')

// json middleware to convert data to json formate!-----------------
app.use(express.json())

//get method to fech data from the database!----------------------

app.get('/products', async(req,res)=>{
   try{
    const products = await product.find({});
    res.status(200).json(products);

   }
   catch(error){
      console.log(error.message);
      res.status(500).json({message:error.message})
   }
})
// using is to get a specified data from the database!------------------------
app.get('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const productid = await product.findById(id);
        res.status(200).json(productid);
    }
    catch(error){
       console.log(error.message);
       res.status(500).json({message:error.message});
    }
})
// post method => sending data from user to database! ------------------------------
app.post('/product/', async(req, res) => {
  try{
    const emp = await product.create(req.body)
    res.status(200).json(emp);
   
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }

})

// put/update method => upating the data which is already saved in the database!------
  app.put('/product/:id',async(req,res)=>{
    try{
    const {id}=req.params;
    const prod = await product.findByIdAndUpdate(id,req.body);
//if we cant find the id!-----
    if(!product){
       return res.status(404).json({message:`cannot findd any product with ${id}`});
     }
     const updated = await product.findById(id)
     res.status(200).json(updated
        )
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});

    }
  })
  // delete method to delete a product from the database-----
  app.delete('/product/:id',async(req,res)=>{
    try{
        const {id}=req.params;
       const del =await product.findByIdAndDelete(id)
       if(!product){
        return res.status(404).json({message:`cannot findd any product with ${id}`});
    }
       res.status(200).json(del)
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message}) 
    }
  })



mongoose.connect('mongodb+srv://ananthuajayan111:abhi101@cluster0.feheynl.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("mongo db connected")
    app.listen(4000,()=>{
        console.log("yohohohohoh");
    })
   
})
.catch((error)=>{
    console.log(error);
})



