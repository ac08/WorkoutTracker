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
    // if (databaseCheck.length === 0) {
    //   console.log('The database is NULL. Database will be seeded.');
    //   require('../seeders/seed');
    //   next();
    // } else {
    //   next();
    // }
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
    console.log('test1')
    const newWorkout = req.body;
    (async function createNewWorkout() {
      try {
        console.log('test2');
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
