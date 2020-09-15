const express = require('express');
const router = express.Router();
const todoItemsCtrl = require('../controller/todoItems.js');


router.post('/create', todoItemsCtrl.createTodoItem);

router.get('/fetch', todoItemsCtrl.fetchItems);



module.exports = router;