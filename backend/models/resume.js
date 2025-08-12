import db from '../config/db.js';

export const Resume = {
  create: async (seeker_id, file_path) => {
    const [result] = await db.execute(
      'INSERT INTO resumes (seeker_id, file_path) VALUES (?, ?)',
      [seeker_id, file_path]
    );
    return result.insertId;
  }
};
