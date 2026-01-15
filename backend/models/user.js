// import db from '../config/db.js';

// export const User = {
//   create: async (name, email, password, phone, user_type) => {
//     const [result] = await db.execute(
//       'INSERT INTO users (name, email, password, phone, user_type) VALUES (?, ?, ?, ?, ?)',
//       [name, email, password, phone, user_type]
//     );
//     return result.insertId;
//   },

//   findByEmail: async (email) => {
//     const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
//     return rows[0];
//   },

//   findAll: async () => {
//     const [rows] = await db.execute('SELECT user_id, name, email, phone, user_type FROM users');
//     return rows;
//   },

//   delete: async (id) => {
//     await db.execute('DELETE FROM users WHERE user_id = ?', [id]);
//   },

// };


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  user_type: { 
    type: String, 
    enum: ['Job Seeker', 'Employer', 'Admin'], 
    required: true 
  },
  date_joined: { type: Date, default: Date.now },
  refresh_token: { type: String, default: null }
});

const User = mongoose.model('User', userSchema);

export const UserModel = {
  create: async (name, email, password, phone, user_type) => {
    const newUser = new User({ name, email, password, phone, user_type });
    return await newUser.save();
  },

  findByEmail: async (email) => {
    return await User.findOne({ email });
  },

  findAll: async () => {
    return await User.find({}, 'name email phone user_type');
  },

  delete: async (id) => {
    return await User.findByIdAndDelete(id);
  }
};