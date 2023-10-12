const User  = require ("../models/UserModel")

const bcrypt = require("bcrypt")

exports.registerUser = async (req,res) => {

    
    try {

        const hashedPassword  = await bcrypt.hash(req.body.password, 3);
  
        const user  = new User ({
            username : req.body.username,
            password : hashedPassword
        });

        await user.save();

        res.json({message: user});

    } catch (error) {
        console.log(error)
    }
}