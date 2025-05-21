const express = require('express');
const router = express.Router();
const {getWorkouts,getWorkout,createWorkout,deleteWorkout,updateWorkout} = require ('../controllers/workoutController');

// Get All workouts
router.get('/', getWorkouts);

// Get Single workout
router.get('/:id', getWorkout);

router.post('/', createWorkout);

router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout);
module.exports = router;