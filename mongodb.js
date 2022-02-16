const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id);
// console.log(id.id.length);
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());


MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database!');
    }
    //console.log('Connected to Database Correctly!');

    const db = client.db(databaseName)

    // Creation command -------------------------------------------------------

    // db.collection('users').insertOne({
    //     name: 'Vikram',
    //     age: 22
    // }, (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert user into database!');
    //     }

    //     console.log(result);

    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, 
    //     {
    //         name: 'Gunther',
    //         age: 20
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert document!');
    //     }

    //     console.log(result)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Task 1',
    //         completed: true
    //     },
    //     {
    //         description: 'Task 2',
    //         completed: true
    //     },
    //     {
    //         description: 'Task 3',
    //         completed: false
    //     }
    // ], (error, result)=>{
    //         if(error){
    //             return console.log('Insertion failed');
    //         }

    //         console.log(result);
    // })

    // Reading Commands -----------------------------------------------

    // db.collection('users').findOne({ name: 'Jen'}, (error, user)=>{
    //     if(error){
    //         return console.log('Error fetching document');
    //     }

    //     console.log(user);

    // })

    // db.collection('users').find({ age: 27}).toArray((error, users)=>{
    //     if(error){
    //         return console.log('Unable to fetch documents');
    //     }

    //     console.log(users);
    // })

    // db.collection('users').find({ age: 27}).count((error, count)=>{
    //     if(error){
    //         return console.log('Unable to fetch documents');
    //     }

    //     console.log(count);
    // })

    

    // For Updating ----------------------------------
    // db.collection('users').updateOne({ 
    //     _id: new ObjectID("61fce57ad687307951a825cb") 
    // },
    // {
    //    $set: {
    //         name: 'Mike'
    //    } 
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })


    // db.collection('tasks').updateMany({
    //     completed: false
    // },
    // {
    //     $set:{
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })


    // For Deleting

    db.collection('users').deleteMany({
        age: 27
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
})