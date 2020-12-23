const express = require('express');

const workoutRouter = express.Router();
const db = require('../models');


// module.exports = function (app) {


//     // add exercise
//     app.put("/:id", (req, res) => {

//         db.Workout.findOneAndUpdate(
//             { _id: req.params.id },
//             {
//                 $inc: { totalDuration: req.body.duration },
//                 $push: { exercises: req.body }
//             },
//             { new: true }).then(dbWorkout => {
//                 res.json(dbWorkout);
//             }).catch(err => {
//                 res.json(err);
//             });

//     });

//     //create workout
//     app.post("/api/workouts", ({ body }, res) => {
//         // console.log("WORKOUT TO BE ADDED");
//         // console.log(body);

//         db.Workout.create(body).then((dbWorkout => {
//             res.json(dbWorkout);
//         })).catch(err => {
//             res.json(err);
//         });
//     });

//     // get workouts in range
//     app.get("/api/workouts/range", (req, res) => {

//         db.Workout.find({}).then(dbWorkout => {
//             console.log("ALL WORKOUTS");
//             console.log(dbWorkout);

//             res.json(dbWorkout);
//         }).catch(err => {
//             res.json(err);
//         });

//     });
// }

function router(app) {
  workoutRouter.route('/')
  .all(async (req, res, next) => {
    const databaseCheck = await db.Workout.find({});
    if (databaseCheck.length === 0) {
      console.log('database is null');
      require('../seeders/seed');
      next();
    } else {
      next();
    }
  })
  .get(async (req, res) => {
    const dbWorkout = await db.Workout.find({});
    res.json(dbWorkout);
  });

    
    // then(dbWorkout => {
    //     dbWorkout.forEach(workout => {
    //         let total = 0;
    //         workout.exercises.forEach(e => {
    //             total += e.duration;
    //         });
    //         workout.totalDuration = total;

    //     });

    //     res.json(dbWorkout);
    // }).catch(err => {
    //     res.json(err);
    // });

  // workoutRouter.route('/:id')
  //   .post((req, res) => {
  //     const { username, password } = req.body;
  //     (async function addUser() {
  //       try {
  //         const dbUser = await db.User.create({
  //           username,
  //           password
  //         });
  //         // login information stored in a cookie, deletes when server restarts
  //         req.login(dbUser.dataValues, () => {
  //           // redirect to another page to choose categories...
  //           res.redirect('/auth/profile');
  //         });
  //       } catch (err) {
  //         debug(err);
  //       }
  //     }());
  //   });

  return workoutRouter;
}

module.exports = router;
