require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('620397501d035df93b1c4da2').then((task)=>{
//     console.log(task);
//     return Task.countDocuments({ completed: false })
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// })

const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })

    return count
} 

deleteTaskAndCount('62039c810d4daef8099239e4').then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})