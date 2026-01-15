// import db from '../config/db.js';

// export const Job = {
//   create: async (employer_id, title, description, location, salary, job_type, image_path) => {
//     const [result] = await db.execute(
//       'INSERT INTO jobs (employer_id, title, description, location, salary, job_type, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [employer_id, title, description, location, salary, job_type, image_path]
//     );
//     return result.insertId;
//   },

//   findAll: async () => {
//     const [rows] = await db.execute('SELECT * FROM jobs WHERE status = "Open"');
//     return rows;
//   },

//   findByEmployerId: async (employer_id) => {
//     const [rows] = await db.execute('SELECT * FROM jobs WHERE employer_id = ?', [employer_id]);
//     return rows;
//   },

//   findById: async (job_id) => {
//     const [rows] = await db.execute('SELECT * FROM jobs WHERE job_id = ?', [job_id]);
//     return rows[0];
//   },

//   update: async (job_id, title, description, location, salary, job_type, image_path) => {
//     const [result] = await db.execute(
//       'UPDATE jobs SET title = ?, description = ?, location = ?, salary = ?, job_type = ?, image_path = ? WHERE job_id = ?',
//       [title, description, location, salary, job_type, image_path, job_id]
//     );
//     return result.affectedRows;
//   },

//   delete: async (job_id) => {
//     const [result] = await db.execute('DELETE FROM jobs WHERE job_id = ?', [job_id]);
//     return result.affectedRows;
//   },

//   findAllAdmin: async () => {
//     const [rows] = await db.execute('SELECT * FROM jobs');
//     return rows;
//   }
// };



import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  employer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  salary: { type: Number },
  job_type: { 
    type: String, 
    enum: ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'], 
    required: true 
  },
  posted_date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  image_path: { type: String }
});

const Job = mongoose.model('Job', jobSchema);

export const JobModel = {
  create: async (employer_id, title, description, location, salary, job_type, image_path) => {
    const newJob = new Job({ employer_id, title, description, location, salary, job_type, image_path });
    return await newJob.save();
  },

  findAll: async () => {
    return await Job.find({ status: "Open" });
  },

  findByEmployerId: async (employer_id) => {
    return await Job.find({ employer_id });
  },

  findById: async (job_id) => {
    return await Job.findById(job_id);
  },

  update: async (job_id, title, description, location, salary, job_type, image_path) => {
    return await Job.findByIdAndUpdate(job_id, {
      title, description, location, salary, job_type, image_path
    }, { new: true });
  },

  delete: async (job_id) => {
    return await Job.findByIdAndDelete(job_id);
  },

  findAllAdmin: async () => {
    return await Job.find({});
  }
};