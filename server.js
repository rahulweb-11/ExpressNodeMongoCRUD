const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongooseClient = require('mongoose');
var db = mongooseClient.connect("mongodb://localhost:27017/Megamartdb", function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log("connected to mongodb server"+ db + "," + data );
    }
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  

//app.get('/', (req,res)=>res.send("hello world"));


var Schema = mongooseClient.Schema;
var ProductSchema = new Schema({      
    ProductCode: { type: String   },       
    ProductName: { type: String   },   
   },{ versionKey: false }); 
   
var model = mongooseClient.model('products', ProductSchema, 'products');
app.get("/api/products",function(req,res){  
    model.find({ProductName: req.body.ProductName},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
  });
  app.delete("/api/deleteProduct",function(req,res){      
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{      
            res.send({data:"Record has been Deleted..!!"});               
        }    
 });    
   }) 

   app.get("/api/getProductById",function(req,res){ 
   // { _id: req.body.id }     
    model.findById( req.body.id, function(err,data) {    
        
     if(err){    
         res.send(err);    
     }    
     else{      
            res.send(data);               
        }    
 });    
   })

   app.get("/api/getProductByCode",function(req,res){ 
    // { _id: req.body.id }     
     model.findOne({ProductCode: req.body.ProductCode}, function(err,data) {    
         
      if(err){    
          res.send(err);    
      }    
      else{      
             res.send(data);               
         }    
  });    
    })
app.listen(8080);