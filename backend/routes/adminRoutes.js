import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import {
    getAllUsers,
    deleteUser,
    getAllJobs,
    deleteJob,
    getAllApplications,
    getAllResumes,
    createAdmin // Import the new controller
} from '../controllers/adminController.js';

const router = express.Router();

// User management routes
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// Admin registration route
router.post('/register', authMiddleware, adminMiddleware, createAdmin);

// Job routes
router.get('/jobs', authMiddleware, adminMiddleware, getAllJobs);
router.delete('/jobs/:id', authMiddleware, adminMiddleware, deleteJob);

// Application routes
router.get('/applications', authMiddleware, adminMiddleware, getAllApplications);

// Resume routes
router.get('/resumes', authMiddleware, adminMiddleware, getAllResumes);

export default router;