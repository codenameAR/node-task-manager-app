const mongoose = require("mongoose");

const Task = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// const task = new Tasks({
//     description: 'Task 2        '
// })

// task.save().then(()=>{
//     console.log(task);
// }).catch((error)=>{
//     console.log(error);

module.exports = Task;
