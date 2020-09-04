const express = require('express');
const mongoose = require('mongoose');
const config = require('./configuration/config');

config();

const app = express();

const PORT = process.env.PORT || 3001;



app.listen(PORT, ()=> {
    console.log('Server Port 3001 is Running');
});