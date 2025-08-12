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
    const [rows] = await db.execute('SELECT * FROM applications WHERE job_id = ?', [job_id]);
    return rows;
  }
};
