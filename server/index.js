const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todolistRoute = require('./routes/todolist.router.js');
const todoItemsRoute = require('./routes/todoitems.router.js');
const DB_connection = require('./configuration/config');
const TodoLists = require('./models/todoList.model.js'); 
const ItemList = require('./models/ItemsList.model.js');


DB_connection();

const app = express();

// app.use(cors()); // using cors for corss origin request (exp. 4200 for client ). using proxy in 'proxy.config.json' file instead of cors.

const PORT = process.env.PORT || 3001;

app.use(express.json()); // to parse body from http request 

app.use('/todoLists', todolistRoute);
app.use('/todoItems', todoItemsRoute);





app.listen(PORT, ()=> {
    console.log(`Server Port  ${PORT} is Running`);
});