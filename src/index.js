const express = require('express')
require('./db/mongoose')
const { findByIdAndUpdate } = require('./models/user')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000;


//
//  Without middleware: new request -> run route handler
//
//  With middleware: new request -> do something -> run route handler
//

// Using middleware to block out route handlers temporarly (Note:- Blocks all Routes)
// app.use((req, res, next)=>{
//     res.status(503).send('Site is Under Maintenance! PLease come back soon')
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log(`Listening to Port ${port} !`);
})
