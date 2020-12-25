const mongoose = require('mongoose');

// Create a Mongoose schema
const Schema = mongoose.Schema;
// Configure sub-document 'exercise'
const exercise = {
  type: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  duration: Number,
  weight: {
    type: Number,
    default: 0
  },
  reps: {
    type: Number,
    default: 0
  },
  sets: {
    type: Number,
    default: 0
  },
  distance: {
    type: Number,
    default: 0
  }
}
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [ exercise ],
  totalDuration: {
    type: Number,
    default: 0,
  }

});

// Creating a Mongoose model; a Mongoose model is compiled from a Mongoose schema
// May create as many models against the schema definition as needed
const Workout = mongoose.model("Workout", WorkoutSchema);

// document is an instance of the model

module.exports = Workout;