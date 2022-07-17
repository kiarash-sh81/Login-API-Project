const User = require('../model/User');
const bcrypt = require('bcryptjs');
// const e = require('express');

exports.register = async (req , res) =>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send("User Saved");
    } catch (err) {
        res.status(400).send(err);
        
    }
}

exports.login = async (req , res) =>{
    try {
        // const {username , password} = req.body;
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