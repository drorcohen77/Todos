const TodoItems = require('../models/ItemsList.model.js');


exports.createTodoItem = (req, res) => {
    const todoItems = new TodoItems(req.body);

    todoItems.save().then(() => {
        return res.status(201).send(todoItems);
    }).catch((err) => {
        return res.status(400).send(err);
    });
}; 