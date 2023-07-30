const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists!' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashPassword });
    

    // Generate JWT token after successful registration
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    newUser.token = token;
    console.log(token);

    res.status(201).json(newUser);
    

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error!' });

  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed!' });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(401).json({ error: 'Password is wrong!' });
    }

    // Generate JWT token after successful login
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    user.token = token;


    return res.status(200).json({ token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error!' });
  }
};
