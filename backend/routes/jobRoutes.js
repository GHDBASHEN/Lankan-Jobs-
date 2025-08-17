import express from 'express';
import multer from 'multer';
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

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('image'), createJob);
router.get('/', getJobs);
router.get('/my-jobs', authMiddleware, getJobsByEmployer);
router.get('/:id', getJobById);
router.put('/:id', authMiddleware, upload.single('image'), updateJob);
router.delete('/:id', authMiddleware, deleteJob);

export default router;