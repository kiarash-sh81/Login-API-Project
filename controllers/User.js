const User = require('../model/User');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
const { UserSchema , loginUserSchema} = require('../utils/validationUser');

exports.register = async (req , res) =>{


    //* validation check
    const {error} = await UserSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //* if we dont have an error now we can make an obj and save it
    const existUser = await User.findOne({username: req.body.username});
    const existEmail = await User.findOne({email: req.body.email});
    if(existUser) {
        return res.status(400).send("Sorry this username already has been taken!");
    }
    if(existEmail){ 
        return res.status(400).send("Sorry this email already has been taken!");
    }
   
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    //* saving user
    try {
        const savedUser = await user.save();
        res.send("User Saved");
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.login = async (req , res) =>{
    //* validation check
    const {error} = await loginUserSchema.validate(req.body);
    if(error)  return res.status(400).send(error.details[0].message);
    
    //* if we dont have an error now we can check username and password
    
    try {
        const Username = req.body.username;
        const Password = req.body.password;
        const Data = await User.findOne({username: Username});
        if(Data){
            const validPass = await bcrypt.compare(Password , Data.password);
            if(validPass){
                res.send("Valid Username And Password");
            }else{
                res.send("Wrong Password!");
            }
        }else{
            res.send("This User Name Don't Exist ");
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).send("somthing wrong!");
    }
}