import express from 'express';
import { applyJob,getAppliedJobs  } from '../controllers/applicationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', authMiddleware, applyJob);
router.get('/my-applications', authMiddleware, getAppliedJobs);

export default router;
