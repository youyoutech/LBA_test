const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var Storage = require('dom-storage');
const ls = new Storage();

let User = require('../models/user.model');


router.use(cors());


router.post('/register', (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
    }
    User.findOne({
        username: req.body.username
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => res.status(200).json({ message: user.email + ' is registered successfully!' }))
                        .catch(err => res.status(400).json('error: ' + err))
                })
            } else {
                res.status(400).json({ message: 'User already exists!' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err })
        })
})

router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        id: user._id,
                        email: user.email,
                    }
                    jwt.sign({ payload }, 'secretkey', { expiresIn: '12h' }, (err, token) => {
                        if (err) {
                            res.status(400).json({
                                message: 'error while authentication'
                            });
                        } else {
                            ls.setItem('token', token);
                            res.json({
                                token: token
                            });
                        }
                    });
                } else {
                    res.status(400).json({
                        message: "Wrong password"
                    });
                }
            } else {
                res.status(400).json({
                    message: "User does not exist"
                });
            }
        })
        .catch(err => res.status(400).json({ message: err }));
});


module.exports = router