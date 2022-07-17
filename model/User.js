const mongoose  =require('mongoose');
const bcrypt = require('bcryptjs');

//* making schema
const UserSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        trim: true,//? delete space
        minlength: 3,
        max: 255
    },
    email:{
        type: String,
        require: true,
        trim: true,
        minlength: 6,
        max: 255
    },
    password:{
        type: String,
        require:true,
        trim: true,
        max: 1024
    },
    Date:{
        type: Date,
        default: Date.now
    }
});

//* hashing password
UserSchema.pre('save' ,async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(this.password , salt);
        this.password = hashedPass;
        next();
    } catch (err) {
        next(err);
    }
})

module.exports = mongoose.model("User" , UserSchema);