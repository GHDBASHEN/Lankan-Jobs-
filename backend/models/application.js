import db from '../config/db.js';

export const Application = {
  create: async (job_id, seeker_id) => {
    const [result] = await db.execute(
      'INSERT INTO applications (job_id, seeker_id) VALUES (?, ?)',
      [job_id, seeker_id]
    );
    return result.insertId;
  },

  findByJob: async (job_id) => {
    const [rows] = await db.execute(
      'SELECT u.user_id, u.name, u.email, r.file_path FROM users u JOIN applications a ON u.user_id = a.seeker_id LEFT JOIN resumes r ON u.user_id = r.seeker_id WHERE a.job_id = ?',
      [job_id]
    );
    return rows;
  },

  findBySeeker: async (seeker_id) => {
      const [rows] = await db.execute(
          'SELECT j.* FROM jobs j JOIN applications a ON j.job_id = a.job_id WHERE a.seeker_id = ?',
          [seeker_id]
      );
      return rows;
  }
};