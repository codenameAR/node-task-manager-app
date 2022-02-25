const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7, 
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password cannot be 'password'")
            }
        }


    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token: token})
    await user.save()

    return token
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async(email, password)=>{
    const user = await User.findOne({ email: email})

    if(!user){
        throw new Error('Unable to Login!');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to Login!')
    }

    return user
}


// Hash the plain text password before Saving the user
userSchema.pre('save', async function (next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Deletes the User`s tasks when user is removed
userSchema.pre('remove', async function (next){
    const user = this
    await Task.deleteMany({ owner: user._id})

    next()
})

const User = mongoose.model('User', userSchema)


// const me = new User({
//     name: '  Andrew  ',
//     email: 'MYEMAIL@mead.IO    ',
//     password: 'abcd123456'
// })

// me.save().then(()=>{    
//     console.log(me);
// }).catch((error)=>{
//     console.log(error);
// })


module.exports = User