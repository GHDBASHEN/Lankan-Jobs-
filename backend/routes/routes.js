import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'This is a sample API response' });
});

export default router;
