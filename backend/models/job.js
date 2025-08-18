import db from '../config/db.js';

export const Job = {
  create: async (employer_id, title, description, location, salary, job_type, image_path) => {
    const [result] = await db.execute(
      'INSERT INTO jobs (employer_id, title, description, location, salary, job_type, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [employer_id, title, description, location, salary, job_type, image_path]
    );
    return result.insertId;
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM jobs WHERE status = "Open"');
    return rows;
  },

  findByEmployerId: async (employer_id) => {
    const [rows] = await db.execute('SELECT * FROM jobs WHERE employer_id = ?', [employer_id]);
    return rows;
  },

  findById: async (job_id) => {
    const [rows] = await db.execute('SELECT * FROM jobs WHERE job_id = ?', [job_id]);
    return rows[0];
  },

  update: async (job_id, title, description, location, salary, job_type, image_path) => {
    const [result] = await db.execute(
      'UPDATE jobs SET title = ?, description = ?, location = ?, salary = ?, job_type = ?, image_path = ? WHERE job_id = ?',
      [title, description, location, salary, job_type, image_path, job_id]
    );
    return result.affectedRows;
  },

  delete: async (job_id) => {
    const [result] = await db.execute('DELETE FROM jobs WHERE job_id = ?', [job_id]);
    return result.affectedRows;
  },

  findAllAdmin: async () => {
    const [rows] = await db.execute('SELECT * FROM jobs');
    return rows;
  }
};