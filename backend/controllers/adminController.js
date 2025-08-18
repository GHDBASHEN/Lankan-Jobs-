import { User } from '../models/user.js';
import { Job } from '../models/job.js';
import { Application } from '../models/application.js';
import { Resume } from '../models/resume.js';

// User Management
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.delete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Job Management
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.findAllAdmin();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        await Job.delete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Application Management
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.findAll();
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Resume Management
export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.findAll();
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createAdmin = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await User.create(name, email, hashedPassword, phone, 'Admin');
        res.status(201).json({ message: 'Admin user registered successfully', userId });
    } catch (err) {
        // Check for duplicate email error
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'An account with this email already exists.' });
        }
        res.status(500).json({ message: err.message });
    }
};