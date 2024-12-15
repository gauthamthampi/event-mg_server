import User from '../model/user.js';
import jwt from 'jsonwebtoken';

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // Create a new user
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
};


// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });    
    res.status(200).json({token});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
