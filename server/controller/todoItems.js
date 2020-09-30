const TodoItems = require('../models/ItemsList.model.js');
const TodoLists = require('../models/todoList.model.js');


exports.createTodoItem = async (req, res) => {
    const todoItems = new TodoItems(req.body);

    try {

        await TodoLists.findById(todoItems.listId)
                    .populate('itemID')
                    .exec(function(err,foundList) {
                        foundList.itemID.push(todoItems);
                        foundList.save();
                    });
        
        await todoItems.save().then(() => {
            res.status(201).send(todoItems);
        });
    } catch(err) {
        return res.status(400).send(err);
    };
}; 


exports.fetchItems = async (req, res) => {

    try {
        const todoItems = await TodoItems.find({});
        res.status(201).send(todoItems);
    } catch(err) {
        res.status(500).send(err);
    };
};


exports.modifyItem = async (req, res) => {

    const itemID = req.params.itemid;
    const item = req.body;
    
    const update = Object.keys(item);
    const allwedUpdate = 'isCompleted';
    const isValidUpdating = update[0] === allwedUpdate? true : false;
    
    if (!isValidUpdating) {
        return res.status(400).send({ 'error':`Invalid property. Property '${update}' don't mach TodoItem Model!`});
    }

    try {
        const todoItem = await TodoItems.findByIdAndUpdate(itemID, item, {new: true, runValidators: true});
        if (!todoItem) {
            return res.status(404).send();
        }
        console.log(todoItem)
        res.status(201).send(todoItem);
    } catch (err) {
        res.status(400).send(err);
    };
};


exports.markUncompletedItems = async (req, res) => {

    const listID = req.params.listid;
    const unCompletedItems = req.body;

    unCompletedItems.map(item => {
        console.log(item)
        const update = Object.keys(item);
        const allwedUpdate = 'isCompleted';
        const isValidUpdating = update.includes(allwedUpdate); 

        if (!isValidUpdating) {
            return res.status(400).send({ 'error':`Invalid property. Property '${update}' don't mach TodoItem Model!`});
        }
    });
    

    try {
        // const todoList = await TodoLists.findById(listID);
        // todoList.itemID = [];
        const updatedItems = [];

        unCompletedItems.map(item => {
            // item.isCompleted = true;
            TodoItems.findByIdAndUpdate(item._id, {'$set':{'isCompleted': true}}, {new: true, runValidators: true},(err,updatedItem) => {
                if (err) return res.status(400).send(err)
                updatedItems.push(updatedItem);

            });
            // updatedItems.push(updatedItem);
            // todoList.itemID.push(updatedItem);
        })
        // todoList.itemID = await TodoItems.updateMany({'isCompleted': false}, {'$set':{'isCompleted': true}});
        // console.log(todoList.itemID)
        res.status(201).send(updatedItems);
    } catch (err) {
        res.status(400).send(err);
    }
};






