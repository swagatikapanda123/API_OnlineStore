const Product = require('../models/product')

exports.createProduct = (req, res, next) =>{
    const product = new Product ({
        name : req.body.name,
        description : req.body.description,
        price: req.body.price,
        userId: req.body.userId
    })
    product.save().then(()=>{
        res.status(201).json({
            message: 'product created'
        })
    }).catch((error)=>{
        res.status(400).josn({
            error: error
        })
    })
}

exports.getOneProduct = (req, res, next) =>{
    Product.findOne({
        _id: req.params.id
    }).then((thing)=>{
        res.status(200).json(product);
    }).catch((error)=>{
        res.status(400).json({
            error:error
        })
    })
}

exports.modifyProduct = (req, res, next) =>{
    const product = new Product ({
        name : req.body.name,
        description : req.body.description,
        price: req.body.price,
        userId: req.body.userId
    })
    Product.updateOne({_id: req.params.id}, product)
    .then(()=>{
        res.status(201).json({
            message: 'Product updated'
        })
    }).catch((error)=>{
        res.status(400).json({
            error: error
        })
    })
}

exports.deleteProduct = (req, res, next) =>{
    Product.deleteOne({_id: req.params.id})
    .then(()=>{
        res.status(200).json({
            message: 'product deleted'
        })
    }).catch((error)=>{
        res.status(400).json({
            error: error
        })
    })
}

exports.getAllProduct = (req, res, next) => {
    //res.sendFile(__dirname + '/index.html')
    // db.collection('product').find().toArray()
    // .then(product => {
    //     //console.log(product)
    //     res.render('index.ejs',{
    //       product: product,
    //     })
    // }).catch(error =>{
    //     res.status(400).json({error: error})
    // })
    Product.find().then((products)=>{
        res.status(200).json(products);
    }).catch((error)=>{
       res.status(400).json({
           error: error
       });
    });
  }
