const express = require('express');
const Router = express.Router();


// routes
const {
  createWorkout,
  getallWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");


// GET all workouts
Router.get("/", getallWorkout);

// GET a workout
Router.get("/:id",  getWorkout);

// CREATE a new workout
Router.post("/",  createWorkout);

// UPDATE a workout
Router.patch("/:id", updateWorkout);

// DELETE a workout
Router.delete("/:id",  deleteWorkout);

module.exports = Router