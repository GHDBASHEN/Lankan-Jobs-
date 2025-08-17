import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, user_type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.create(name, email, hashedPassword, phone, user_type);
    res.status(201).json({ message: 'User registered', userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { 
        userId: user.user_id, 
        type: user.user_type, 
        name: user.name, 
        email: user.email 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};