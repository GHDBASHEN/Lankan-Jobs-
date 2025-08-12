import db from '../config/db.js';

export const Job = {
  create: async (employer_id, title, description, location, salary, job_type) => {
    const [result] = await db.execute(
      'INSERT INTO jobs (employer_id, title, description, location, salary, job_type) VALUES (?, ?, ?, ?, ?, ?)',
      [employer_id, title, description, location, salary, job_type]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM jobs WHERE status = "Open"');
    return rows;
  }
};


