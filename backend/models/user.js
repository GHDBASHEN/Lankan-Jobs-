import db from '../config/db.js';

export const User = {
  create: async (name, email, password, phone, user_type) => {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, phone, user_type) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, phone, user_type]
    );
    return result.insertId;
  },

  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT user_id, name, email, phone, user_type FROM users');
    return rows;
  },

  delete: async (id) => {
    await db.execute('DELETE FROM users WHERE user_id = ?', [id]);
  },

};
