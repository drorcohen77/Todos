const express = require('express');
const mongoose = require('mongoose');
const todolistRoute = require('./routes/todolist.router.js');
const todoItemsRoute = require('./routes/todoitems.router.js');
const DB_connection = require('./configuration/config');
const TodoLists = require('./models/todoList.model.js'); 
const ItemList = require('./models/ItemsList.model.js');


DB_connection();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json()); // to parse body from http request 

app.use('/todoList', todolistRoute);
// app.post('/todoList', (req, res) => {
//     const todoList = new TodoLists(req.body);

//     todoList.save().then(() => {
//         res.status(201).send(todoList);
//     }).catch((err) => {
//         res.status(400).send(err);
//     });
// });

app.use('/todoItems', todoItemsRoute);
// app.post('/todoItem', (req, res) => {
//     const todoItems = new ItemList(req.body);

//     todoItems.save().then(() => {
//         res.status(201).send(todoItems);
//     }).catch((err) => {
//         res.status(400).send(err);
//     });
// });


app.get('/todoLists', (req, res) => {
    TodoLists.find({}).then((todoList) => {
        res.status(201).send(todoList);
    }).catch((err) => {
        res.status(500).send(err);
    });
});
// const Schema = mongoose.Schema;


// const TodoList = mongoose.model('TodoList', {
//     id: {
//         type: Number
//     },
//     caption: {
//         type: String,
//         required: "Caption is Required"
//     },
//     description: {
//         type: String,
//         required: "Description is Required"
//     }, 
//     image_url: {
//         type: String,
//         required: "Image_url is Required"
//     }, 
//     color: {
//         type: String,
//         required: "Color is Required"
//     }
// });

// const todolist = new TodoList(
    // {
//     id: 1,
//       caption: 'one',
//       description: 'test1 t t t t t t t t t',
//       image_url: 'event',
//       color: 'black',
// })

// todolist.save().then((req, res) => {
//     console.log(todolist);
// }).catch((error) => {
//     console.log('Error', error);
// })



app.listen(PORT, ()=> {
    console.log('Server Port ' + PORT + ' is Running');
});