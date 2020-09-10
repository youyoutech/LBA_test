const router = require('express').Router()
let Product = require('../models/product.model')

router.route('/').get((req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(400).json({ message: err })
        })
})

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            res.status(400).json({ message: err })
        })
})

router.route('/:id').put((req, res) => {

    const newData = {
        name: req.body.name,
        type: req.body.type,
        price: Number(req.body.price),
        rating: Number(req.body.rating),
        warranty_years: Number(req.body.warranty_years),
        available: req.body.available
    }

    Product.findOneAndUpdate({ _id: req.params.id }, newData)
        .then(product => {
            res.status(200).json({ message: product.name + " has been updated!" })
        })
        .catch(err => {
            res.status(400).json({ message: err })
        })
})

router.route('/:id').delete((req, res) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(product => {
            res.status(200).json({ message: product.name + " has been deleted successfully!" })
        })
        .catch(err => {
            res.status(400).json({ message: err })
        })
})

router.route('/add').post((req, res) => {
    const productData = {
        name: req.body.name,
        type: req.body.type,
        price: Number(req.body.price),
        rating: Number(req.body.rating),
        warranty_years: Number(req.body.warranty_years),
        available: req.body.available
    }

    Product.findOne({
        name: req.body.name
    })
        .then(product => {
            if (!product) {
                Product.create(productData)
                    .then(product => {
                        res.status(200).json({ message: product.name + " is now registred!" })
                    })
                    .catch(err => {
                        res.status(200).json({ message: err })
                    })
            } else {
                res.status(400).json({ message: "Name already taken!" })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err })
        })
})


module.exports = router