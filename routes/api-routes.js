const express = require('express');

const workoutRouter = express.Router();
const db = require('../models');

function router() {
  workoutRouter.route('/')
  .all((req, res, next) => {
    (async function query() {
      try {
        const databaseCheck = await db.Workout.find({});
        console.log(databaseCheck);
        next();
      } catch (err) {
        res.json(err);
      }
    }());
  })
  .get((req, res) => {
    (async function findAllWorkouts() {
      try {
        const dbWorkout = await db.Workout.find({});
        res.json(dbWorkout)
      } catch (err) {
        res.json(err);
      }
    }());
  })
  // Add Workout
  .post((req, res) => {
    const newWorkout = req.body;
    (async function createNewWorkout() {
      try {
        const dbWorkout = await db.Workout.create(newWorkout);
        console.log(dbWorkout);
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
  .get((req, res) => {
    (async function findAllWorkouts() {
      try {
        const dbWorkouts = await db.Workout.find({})
        res.json(dbWorkouts);
      } catch (err) {
        res.json(err);
      }
    }());
  })

  return workoutRouter;
}

module.exports = router;
