import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";// hash the password
import jwt from "jsonwebtoken"; // generate token to
import dotenv from "dotenv"; // import the dotenv

export function registerUser(req, res) {
    
    const data = req.body;
    //npm install bcrypt before using it
    data.password = bcrypt.hashSync(data.password, 10);// 10 is the salt value// hash time
    const newUser = new User(data);

    newUser.save().then(() => {
        res.json({"message": "User Created Successfully"});
    }).catch((error) => {
        res.status(500).json({error: error});
    })
}

export function loginUser(req, res) {
    const data = req.body;
    User.findOne(
        {
            email: data.email
        }
    ).then(
        (user)=>{
        if (user == null){
            res.status(404).json({error: "User not found"}); 
        }
        else {
            const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

            if (isPasswordCorrect){
                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    role : user.role,
                    profilePicture : user.profilePicture,
                    phone : user.phone
                }, process.env.JWT_SECRET );
                res.json({message: "Login successful" , token : token , user : user});
            }else{
                res.status(401).json({error: "Invalid password"});
            }
        }
    })
}
export function isadmin(req){
    if (req.user != null && req.user.role == "admin") {
        return true;
    }
    else {
        return false;
    }
}
export function isCustomer(req){
    if (req.user != null && req.user.role == "customer") {
        return true;
    }
    else{
        return false;
    }
}