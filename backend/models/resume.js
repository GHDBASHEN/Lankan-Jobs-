import db from '../config/db.js';

export const Resume = {
  create: async (seeker_id, file_path) => {
    const [result] = await db.execute(
      'INSERT INTO resumes (seeker_id, file_path) VALUES (?, ?)',
      [seeker_id, file_path]
    );
    return result.insertId;
  },

  findBySeeker: async (seeker_id) => {
    const [rows] = await db.execute('SELECT * FROM resumes WHERE seeker_id = ?', [seeker_id]);
    return rows[0];
  },

  update: async (seeker_id, file_path) => {
    const [result] = await db.execute(
      'UPDATE resumes SET file_path = ? WHERE seeker_id = ?',
      [file_path, seeker_id]
    );
    return result.affectedRows;
  },

  delete: async (seeker_id) => {
    const [result] = await db.execute('DELETE FROM resumes WHERE seeker_id = ?', [seeker_id]);
    return result.affectedRows;
  }
};