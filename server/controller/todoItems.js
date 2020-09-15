const TodoItems = require('../models/ItemsList.model.js');


exports.createTodoItem = async (req, res) => {
    const todoItems = new TodoItems(req.body);

    try {
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


// exports.modifyItems = async (req, res) => {

//     const itemID = req.params.id;
//     const item = req.body;
    
//     const update = Object.keys(item);
//     const allwedUpdate = ['caption','listId','isCompleted'];
//     const isValidUpdating = update.every((items) => allwedUpdate.includes(items));
//     console.log(isValidUpdating)
    
//     if (!isValidUpdating) {
//         return res.status(400).send({ 'error':`Invalid property. Property '${update}' don't mach TodoItem Model!`});
//     }
// //     const itemIsCompleted = new TodoItems(req.body.isCompleted)
// // console.log(itemID,item)
//     try {
//         const todoItem = await TodoItems.findByIdAndUpdate(itemID, item, {new: true, runValidators: true});
//         if (!todoItem) {
//             return res.status(404).send();
//         }

//         res.status(201).send(todoItem);
//     } catch (err) {
//         res.status(400).send(err);
//     };
// };







