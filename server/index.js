const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

const todolistRoute = require('./routes/todolist.router.js');
const todoItemsRoute = require('./routes/todoitems.router.js');
const DB_connection = require('./configuration/config');
const TodoLists = require('./models/todoList.model.js'); 
const ItemList = require('./models/ItemsList.model.js');


DB_connection();

const app = express();

// app.use(cors()); // using cors for corss origin request (exp. 4200 for client ). using proxy in 'proxy.config.json' file instead of cors.

const PORT = process.env.PORT || 3001;

// const corsOption = {
//     origin: "*",
//     optionsSuccessStatus:200
// }
// app.use(cors(corsOption))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json()); // to parse body from http request 

app.use('/api/todoLists', todolistRoute);
app.use('/api/todoItems', todoItemsRoute);





app.listen(PORT, ()=> {
    console.log(`Server Port  ${PORT} is Running`);
});