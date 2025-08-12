import express from 'express';
import { applyJob } from '../controllers/applicationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, applyJob);

export default router;
