const express = require('express');

const workoutRouter = express.Router();
const db = require('../models');

function router() {
  workoutRouter.route('/')
  .all(async (req, res, next) => {
    const databaseCheck = await db.Workout.find({});
    if (databaseCheck.length === 0) {
      console.log('The database is NULL. Database will be seeded.');
      require('../seeders/seed');
      next();
    } else {
      next();
    }
  })
  .get(async (req, res) => {
    const dbWorkouts = await db.Workout.find({});
    res.json(dbWorkouts);
  })
  // Add Workout
  .post((req, res) => {
    const newWorkout = req.body;
    (async function createNewWorkout() {
      try {
        const dbWorkout = await db.Workout.create(newWorkout);
        res.json(dbWorkout)
      } catch (err) {
        res.json(err);
      }
    }());
  })
  // Add Exercise
  workoutRouter.route('/:id')
  .put((req, res) => {
    const dbWorkoutId = req.params.id;
    console.log(dbWorkoutId);
    (async function addExercise() {
      try {
        const dbWorkout = await db.Workout.findOneAndUpdate(
          { _id: dbWorkoutId },
          {
            $push: { exercises: req.body },
            $inc: { totalDuration: req.body.duration }
          },
          { new: true }
        );
        res.json(dbWorkout);
      } catch (err) {
        res.json(err);
      }
    }());
  });
  workoutRouter.route('/range')
  .get(async (req, res) => {
    const dbWorkouts = await db.Workout.find({});
    res.json(dbWorkouts);
  })

  return workoutRouter;
}

module.exports = router;
