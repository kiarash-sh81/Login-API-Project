const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const dotenv = require('dotenv');
const { UserSchema , loginUserSchema} = require('../utils/validationUser');


//*config env
dotenv.config({path : "../config/.env"});


//? registering new user 
exports.register = async (req , res) =>{


    //* validation check
    const {error} = await UserSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //* if we dont have an error now we can make an obj and save it

    //* checking that there is not registered account like the intered user and email
    const existUser = await User.findOne({username: req.body.username});
    const existEmail = await User.findOne({email: req.body.email});
    if(existUser) {
        return res.status(400).send("Sorry this username already has been taken!");
    }
    if(existEmail){ 
        return res.status(400).send("Sorry this email already has been taken!");
    }
   //* making new user by useing the schema
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
//? end of register

//? loging user
exports.login = async (req , res) =>{
    //* validation check
    const {error} = await loginUserSchema.validate(req.body);
    if(error)  return res.status(400).send(error.details[0].message);
    
    //* if we dont have an error now we can check username and password
    
    try {
        const Username = req.body.username;
        const Password = req.body.password;
        const Data = await User.findOne({username: Username});//finding username
        if(Data){
            const validPass = await bcrypt.compare(Password , Data.password);//compare hashed pass and intered pass
            if(validPass){
                const UserId = Data.id;//geting user id
                const accessToken = await jwt.sign(UserId , process.env.ACCESS_TOKEN_SECRET);//making token
                res.send(`Valid Username And Password \n ${accessToken}`);


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