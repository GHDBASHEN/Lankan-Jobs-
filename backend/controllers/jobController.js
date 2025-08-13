import { Job } from '../models/job.js';

export const createJob = async (req, res) => {
  try {
    if (req.user.type !== 'Employer') return res.status(403).json({ message: 'Only employers can post jobs' });

    const { title, description, location, salary, job_type } = req.body;
    const jobId = await Job.create(req.user.userId, title, description, location, salary, job_type);
    res.status(201).json({ message: 'Job posted', jobId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
