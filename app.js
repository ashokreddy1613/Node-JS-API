const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

//body parser middleware
// Takes the raw requests and turns them into usable properties on req.body
//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

//Cors middleware to allow the requests from different origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//Routes
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

//passing local variables 
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

//connecting to MongoDB
mongoose.connect('mongodb:localhost:27017/Nodetask')
.then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
