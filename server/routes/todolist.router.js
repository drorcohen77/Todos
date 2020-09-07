const express = require('express');
const router = express.Router();
const todoListCtrl = require('../controller/todoList.js');
const TodoLists = require('../models/todoList.model.js');


router.post('', todoListCtrl.createTodoList);


module.exports = router;