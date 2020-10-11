const express = require('express');
const router = new express.Router();

const todoListCtrl = require('../controller/todoList.js');


router.post('/create', todoListCtrl.createTodoList);

router.get('/fetch', todoListCtrl.fetchLists);

router.put('/modify/:id', todoListCtrl.modifyList);

router.delete('/delete/:id', todoListCtrl.deleteList);


module.exports = router;