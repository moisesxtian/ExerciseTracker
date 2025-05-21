const Workout = require('../models/workoutModels');
const mongoose = require('mongoose');
//get all workouts
const getWorkouts = async(req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
} 

//get a single workout
const getWorkout= async(req,res)=>{
    const {id} = req.params;
    try {
        const workout= await Workout.findById(id);
        if(!workout){
            return res.status(404).json({error: 'No such workout'});
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: "Invalid ID"});
    }
}
//create a new workout
const createWorkout = async(req,res)=>{
    const {title, reps, load} = req.body;
    if (!title || reps== null || load == null){
        return res.status(400).json({error: 'Please fill all fields'});
    }
    try {
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
//update a workout
const updateWorkout= async(req,res)=>{
    const {id} = req.params;
    try {
        const workout = await Workout.findOneAndUpdate({_id: id},{
            ...req.body
        },{new: true});

        res.status(200).json({workout: workout,status: 'Updated successfully'});
    } catch (error) {
        res.status(400).json({error: 'Could not update'});
    }
}
    
//delete a workout
const deleteWorkout= async(req,res)=>{
    const {id} = req.params;
    try {
        const results= await Workout.findByIdAndDelete(id);
        if(!results){
            return res.status(404).json({error: 'Couldnt find ID'});
        }
        res.status(200).json({Status: 'Workout deleted', results: results});
    } catch (error) {
        res.status(400).json({error:"Could not delete"});
    }
}
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}