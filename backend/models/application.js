// import db from '../config/db.js';

// export const Application = {
//   create: async (job_id, seeker_id) => {
//     const [result] = await db.execute(
//       'INSERT INTO applications (job_id, seeker_id) VALUES (?, ?)',
//       [job_id, seeker_id]
//     );
//     return result.insertId;
//   },

//   findByJob: async (job_id) => {
//     const [rows] = await db.execute(
//       'SELECT u.user_id, u.name, u.email, r.file_path FROM users u JOIN applications a ON u.user_id = a.seeker_id LEFT JOIN resumes r ON u.user_id = r.seeker_id WHERE a.job_id = ?',
//       [job_id]
//     );
//     return rows;
//   },

//   findBySeeker: async (seeker_id) => {
//     const [rows] = await db.execute(
//       'SELECT j.* FROM jobs j JOIN applications a ON j.job_id = a.job_id WHERE a.seeker_id = ?',
//       [seeker_id]
//     );
//     return rows;
//   },

//   findAll: async () => {
//     const [rows] = await db.execute('SELECT * FROM applications');
//     return rows;
//   }
// };


import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  seeker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  application_date: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Rejected'], 
    default: 'Pending' 
  }
});

// Replicates MySQL UNIQUE KEY (job_id, seeker_id)
applicationSchema.index({ job_id: 1, seeker_id: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export const ApplicationModel = {
  create: async (job_id, seeker_id) => {
    const newApp = new Application({ job_id, seeker_id });
    return await newApp.save();
  },

  findByJob: async (job_id) => {
    // Populates seeker details and can also look up the resume in a separate step or via virtuals
    return await Application.find({ job_id }).populate('seeker_id', 'name email');
  },

  findBySeeker: async (seeker_id) => {
    return await Application.find({ seeker_id }).populate('job_id');
  },

  findAll: async () => {
    return await Application.find({});
  }
};