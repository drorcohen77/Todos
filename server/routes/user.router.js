const express = require('express');
const router = new express.Router();
const userCtrl = require('../controller/users.js');


router.post('/register', userCtrl.createUser);


module.exports = router;