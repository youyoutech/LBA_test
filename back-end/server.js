var express = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
const ProductRouter = require('./routes/product')
const UserRouter = require('./routes/user')
let Product = require('./models/product.model')


var app = express()

app.use(express.json())
app.use(cors())

require('dotenv').config()

var port = process.env.PORT || 4000

const uri = "mongodb://127.0.0.1:27017/LBA_test"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log("Connection to databese established")
    Product.initProd(Product)
})

app.use('/product', ProductRouter)
app.use('/user', UserRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})