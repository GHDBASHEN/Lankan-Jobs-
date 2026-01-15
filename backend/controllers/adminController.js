import { UserModel } from '../models/user.js';
import { JobModel } from '../models/job.js';
import { ApplicationModel } from '../models/application.js';
import { ResumeModel } from '../models/resume.js';
import bcrypt from 'bcryptjs';

// User Management
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await UserModel.delete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Job Management
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await JobModel.findAllAdmin();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        await JobModel.delete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Application Management
export const getAllApplications = async (req, res) => {
    try {
        const applications = await ApplicationModel.findAll();
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Resume Management
export const getAllResumes = async (req, res) => {
    try {
        const resumes = await ResumeModel.findAll();
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createAdmin = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await UserModel.create(name, email, hashedPassword, phone, 'Admin');
        res.status(201).json({ message: 'Admin user registered successfully', userId });
    } catch (err) {
        // Check for duplicate email error
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'An account with this email already exists.' });
        }
        res.status(500).json({ message: err.message });
    }
};