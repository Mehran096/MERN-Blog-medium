const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config()

// const createToken = (user) => {
//     return jwt.sign({user}, process.env.SECRET, {expiresIn: "7d"});
// }

module.exports.ProfileNameUpdate = async (req, res) => {
    const {name, id} = req.body 
    if(name === ''){
        res.status(400).json({errors: [{msg: 'Name is required'}]})
    }else{
        try {
            const user = await User.findOneAndUpdate({_id: id}, {name: name}, {new: true})
            const token = jwt.sign({user}, process.env.SECRET, {expiresIn: "7d"});
            return res.status(200).json({token, msg: 'Your Name has been updated successfully'})
        } catch (error) {
            return res.status(500).json({error})
        }

    }
}

//password validation
module.exports.validatePassword = [
    body('current').not().isEmpty().trim().withMessage("Current Password is required"),
    body('newPassword').isLength({min: 6}).withMessage("newpassword must be 6 characters long")
]

//update password
module.exports.profilePasswordUpdate = async (req, res) => {
    const {current, newPassword, userId} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }else{
        const user = await User.findOne({_id: userId})
        if(user){
            const matched = await bcrypt.compare(current, user.password)
            if(!matched){
                return res.status(400).json({errors: [{msg: 'Current Password is wrong'}]})

            }else{
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(newPassword, salt);
                    const newUser = await User.findOneAndUpdate({_id: user}, {password: hash}, {new: true})
                    res.status(200).json({msg: 'Your Password has been changed Successfully'})
                } catch (error) {
                    return res.status(500).json({errors})
                }
            }
        }
    }
}