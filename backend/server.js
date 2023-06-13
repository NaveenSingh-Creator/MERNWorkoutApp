const express = require("express");
const mongoose = require('mongoose');
// express app
const app = express();
require("dotenv").config();


const workoutRoutes = require('./workoutRouter/workoutRoutes')


// This middleware is run everytime something is send to the body and attachs
// it to the request object

// 'Content-Type':'application/json

// middleware


app.use(express.json());

app.use('/api/workout',workoutRoutes)

app.use('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});



// connect to db

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log(" Thank GOD connected to DB & server is listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
