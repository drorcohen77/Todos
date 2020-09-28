const express = require('express');
const router = express.Router();
const todoItemsCtrl = require('../controller/todoItems.js');


router.post('/create', todoItemsCtrl.createTodoItem);

router.get('/fetch', todoItemsCtrl.fetchItems);

router.patch('/modify/:itemid', todoItemsCtrl.modifyItem);

router.patch('/check_all/:listid', todoItemsCtrl.markUncompletedItems);



module.exports = router;