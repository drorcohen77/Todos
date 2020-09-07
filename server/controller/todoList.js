const TodoLists = require('../models/todoList.model.js');


exports.createTodoList = (req, res) => {
    const todoList = new TodoLists(req.body);

    todoList.save().then(() => {
        return res.status(201).send(todoList);
    }).catch((err) => {
        return res.status(400).send(err);
    });
};