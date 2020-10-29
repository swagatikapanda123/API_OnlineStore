const express = require('express')
const mongoose = require('mongoose')
//const Product = require('./models/product')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()

MongoClient.connect('mongodb+srv://swagatika:<password>@cluster0.6w3ly.mongodb.net/your_db_name?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then((client)=>{
    console.log('Successfully connected to  mongodb atlas..')
    const db = client.db('OnlineStore')
    const productCollection = db.collection('product')

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

   //middlewares

   app.get('/', (req,res)=>{
    //res.sendFile(__dirname + '/index.html')
    db.collection('product').find().toArray()
    .then(product => {
        //console.log(product)
        res.render('index.ejs',{
          product: product,
        })
    }).catch(error =>{
        res.status(400).json({error: error})
    })
  })

   app.post('/product',(req, res)=>{
        productCollection.insertOne(req.body)
        .then(result =>{
            //console.log(result)
            res.redirect('/')
        }).catch((error)=>{
            res.status(400).json({
                error: error
            })
        })
    })

    //update data
    app.put('/product/update/:id', (req, res,next)=>{
      const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      })
      Product.updateOne({_id:req.params.id}, product).then(()=>{
        res.status(200).json({
          message: 'Product has been updated'
        })
      }).catch((error)=>{
        res.status(400).json({error: error})
      })
    })

    app.delete('/product/delete/:id', (req,res,next)=>{
    productCollection.deleteOne({_id: req.params.id}).then(()=>{
        res.status(201).json({
          message: 'product deleted!'
        })
      }).catch((error)=>{
        res.status(400).json({
          error: error
        })
      })
    })

   })
  .catch((error)=>{
    console.log('unable to connect to mongodb atlas..')
    console.error(error);
  });



module.exports = app;
