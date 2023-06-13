const Workout = require("../models/workoutModels");
const mongoose = require('mongoose');


// CREATE a new workout

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if(!title){

    emptyFields.push('title');
  }

  if(!reps){

    emptyFields.push('reps');
  }

  if(!load){

    emptyFields.push('load');
  }

  if(emptyFields.length > 0 ){

    return res.status(400).json({error:'please fill in all the fields',emptyFields})

  }
  try {
    // we need to create a new workout ... so use .create()
    // Workout is the workoutModel or the structure
    const workout = await Workout.create({ title, reps, load });

//     res.setHeader('Access-Control-Allow-Origin', '*');
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//res.status(200).json(workout);

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// GET all workout

const getallWorkout = async (req, res) => {
  const workout = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workout);
};

// GET a single workout

const getWorkout = async (req,res) => {

    const {id} = req.params;
    
    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(400).send('The workout doesnt exist');
    }

    res.status(200).json(workout);

    

}


// DELETE a workout

const deleteWorkout = async (req,res) => {

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'The item you are looking for doesnt exists'})
    }

    const workout = await Workout.findOneAndDelete({_id : id});

    if(!workout){
        return res.status(400).json({error : 'Item you are looking does not exist'})
    }

    res.status(200).json(workout);

}

// UPDATE a single workout


const updateWorkout = async (req,res) => {

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'The item you are looking for doesnt exists'})
    }

    const workout = await Workout.findOneAndUpdate({_id : id},{
        ...req.body
    });

    if(!workout){
        return res.status(400).json({error : 'Item you are looking does not exist'})
    }

    res.status(200).json(workout);

}


module.exports = {
  createWorkout,
  getallWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout
};
