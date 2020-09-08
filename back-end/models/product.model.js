const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ProductSchema = new Schema({
    _id: {
        type: Object,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    warranty_years: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
})

ProductSchema.statics.initProd = (Product) => {
    let _products = require('../data/Products (4) (1) (1) (3).json');

    Product.remove({}, (err) => {
        _products.forEach(product => {
            Product.create(product);
        })
    })
}

const Product = mongoose.model("Product", ProductSchema) 

module.exports = Product