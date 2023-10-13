const User  = require ("../models/UserModel")

const bcrypt = require("bcrypt")

exports.registerUser = async (req,res) => {

    
    try {

        const hashedPassword  = await bcrypt.hash(req.body.password, 3);

        const existingUser = await User.findOne({username: req.body.username.toLowerCase()})

        if(existingUser){
            return res.status(409).json({message: "User already exist"})
        }

        const usernameToLowerCase = req.body.username.toLowerCase();

        const user  = new User ({
            username : usernameToLowerCase,
            password : hashedPassword
        });

        await user.save();

        res.status(201).json({message:"Registration successful, welcome " + user.username});

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}