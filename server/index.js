const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const DB_connection = require('./configuration/config');
const todolistRoute = require('./routes/todolist.router.js');
const todoItemsRoute = require('./routes/todoitems.router.js');
const usersRoute = require('./routes/user.router.js');
const TodoLists = require('./models/todoList.model.js'); 
const ItemList = require('./models/ItemsList.model.js');


DB_connection();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json()); // to parse body from http request 

app.use('/api/todoLists', todolistRoute);
app.use('/api/todoItems', todoItemsRoute);
app.use('/api/users', usersRoute);





app.listen(PORT, (error)=> {
    console.log(`Server Port  ${PORT} is Running`);
});