// import db from '../config/db.js';

// export const Resume = {
//   create: async (seeker_id, file_path) => {
//     const [result] = await db.execute(
//       'INSERT INTO resumes (seeker_id, file_path) VALUES (?, ?)',
//       [seeker_id, file_path]
//     );
//     return result.insertId;
//   },

//   findBySeeker: async (seeker_id) => {
//     const [rows] = await db.execute('SELECT * FROM resumes WHERE seeker_id = ?', [seeker_id]);
//     return rows[0];
//   },

//   update: async (seeker_id, file_path) => {
//     const [result] = await db.execute(
//       'UPDATE resumes SET file_path = ? WHERE seeker_id = ?',
//       [file_path, seeker_id]
//     );
//     return result.affectedRows;
//   },

//   delete: async (seeker_id) => {
//     const [result] = await db.execute('DELETE FROM resumes WHERE seeker_id = ?', [seeker_id]);
//     return result.affectedRows;
//   },
  
//   findAll: async () => {
//     const [rows] = await db.execute('SELECT * FROM resumes');
//     return rows;
//   },

// };

// export const checkResume = async (req, res) => {
//     try {
//         if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can have a resume' });
//         const resume = await Resume.findBySeeker(req.user.userId);
//         res.json({ hasResume: !!resume });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }

// };


import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  seeker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  file_path: { type: String, required: true },
  uploaded_date: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);

export const ResumeModel = {
  create: async (seeker_id, file_path) => {
    const newResume = new Resume({ seeker_id, file_path });
    return await newResume.save();
  },

  findBySeeker: async (seeker_id) => {
    return await Resume.findOne({ seeker_id });
  },

  update: async (seeker_id, file_path) => {
    return await Resume.findOneAndUpdate({ seeker_id }, { file_path }, { new: true });
  },

  delete: async (seeker_id) => {
    return await Resume.findOneAndDelete({ seeker_id });
  },

  findAll: async () => {
    return await Resume.find({});
  }
};