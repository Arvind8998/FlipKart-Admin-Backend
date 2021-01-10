const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max:20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max:20
    },
    username:{
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hash_password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {type: String},
    profilePicture: {type: String}
}, {timestamps: true})

userSchema.virtual('password')
.set(function(password){
    const user = this
    user.hash_password = bcrypt.hashSync(password,10)
});

userSchema.virtual('fullName')
.get(function(){
    const user = this
    return `${user.firstName} ${user.lastName}`;
})

userSchema.methods = {
    authenticate: function(password){
        const user = this
        return bcrypt.compareSync(password,user.hash_password)
    }
}

module.exports  = mongoose.model('User',userSchema)