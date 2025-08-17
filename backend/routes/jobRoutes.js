import express from 'express';
import { 
  createJob, 
  getJobs, 
  getJobById,
  getJobsByEmployer, 
  updateJob, 
  deleteJob 
} from '../controllers/jobController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createJob);
router.get('/', getJobs);
router.get('/my-jobs', authMiddleware, getJobsByEmployer);
router.get('/:id', getJobById);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

export default router;