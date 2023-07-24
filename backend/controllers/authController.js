const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({error : 'User already exists!'});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({username, password: hashPassword});
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error!' });
      }
};

exports.loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed!' });
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if(!validatePassword){
            return res.status(401).json({ error: 'Password is wrong!' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' } 
        );

        return res.status(200).json({ token });    

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error!' });
    }
};