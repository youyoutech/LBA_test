const router = require('express').Router()
let Product = require('../models/product.model')

router.route('/').get((req, res) => {
    Product.find()
    .then(products => {
        res.status(200).json(products)
    })
    .catch(err => {
        res.status(400).json({message: err})
    })
})

module.exports = router