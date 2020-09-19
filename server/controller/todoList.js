const TodoLists = require('../models/todoList.model.js');
const TodoItems = require('../models/ItemsList.model.js');



exports.createTodoList = async (req, res) => {

    const todoList = new TodoLists(req.body);
console.log(todoList)
    try {
        await todoList.save().then(() => {
            res.status(201).send(todoList);
        });
    } catch(err) {
        res.status(400).send(err);
    };
};


exports.fetchLists = async (req, res) => {
    console.log('fetch lists')
    try {
        const todoList = await TodoLists.find({});
        res.status(201).send(todoList);
    } catch(err) {
        res.status(500).send(err);
    };

};


exports.modifyList = async (req, res) => {

    const listID = req.params.id;
    const list = req.body;

    const update = Object.keys(list);
    const allwedUpdate = ['caption','description','image_url','color','_id'];
    const isValidUpdating = update.every((items) => allwedUpdate.includes(items));
    console.log(isValidUpdating,update)
    
    if (!isValidUpdating) {
        return res.status(400).send({ 'error':`Invalid object. One or more properties [${update}] don't mach TodoList Model!`});
    }

console.log(listID,list)
    try {
        const todoList = await TodoLists.findByIdAndUpdate(listID, list, {new: true, runValidators: true});
        if (!todoList) {
            return res.status(404).send();
        }

        res.status(201).send(todoList);
    } catch (err) {
        res.status(400).send(err);
    };
};


exports.deleteList = async (req, res) => {
    const listID = req.params.id;

    console.log(listID)
    try {
        const deletedItems = await deleteListItems(listID);
        const todoList = await TodoLists.findByIdAndDelete(listID);

        if(!todoList) {
            return res.status(404).send();
        }

        res.status(201).send(todoList);
    } catch (err) {
        res.status(400).send(err);
    };
};


function deleteListItems(id) {
    console.log(id)
    try {
        return TodoItems.deleteMany( {"listId": id} );
    } catch (err) {
        return err;
    };
};