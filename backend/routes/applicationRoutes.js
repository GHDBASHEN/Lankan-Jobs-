import express from 'express';
import { applyJob, getAppliedJobs, getApplicantsByJob  } from '../controllers/applicationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', authMiddleware, applyJob);
router.get('/my-applications', authMiddleware, getAppliedJobs);
router.get('/job/:id', authMiddleware, getApplicantsByJob);

export default router;