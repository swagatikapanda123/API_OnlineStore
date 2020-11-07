const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const path = require('path')
const indexRoutes = require('./routes/index')
const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')


const app = express()

MongoClient.connect('mongodb+srv://swagatika:7dt3Hxuyj3KZ5zPR@cluster0.6w3ly.mongodb.net/API_OnlineStore?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then((client)=>{
    console.log('Successfully connected to  mongodb atlas..')
    // const db = client.db('OnlineStore')
    // const productCollection = db.collection('product')
   })
  .catch((error)=>{
    console.log('unable to connect to mongodb atlas..')
    console.error(error);
  });

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    app.use(express.static(path.join(__dirname,'public')))
    app.use('/', indexRoutes);
    app.use('/product', productRoutes)
    app.use('/auth', userRoutes)
    



module.exports = app;