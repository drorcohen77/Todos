const express = require('express');
const router = express.Router();
const todoItemsCtrl = require('../controller/todoItems.js');


router.post('', todoItemsCtrl.createTodoItem);



module.exports = router;