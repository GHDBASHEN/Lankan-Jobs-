import { Application } from '../models/application.js';

export const applyJob = async (req, res) => {
  try {
    if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can apply' });

    const { job_id } = req.body;
    const appId = await Application.create(job_id, req.user.userId);
    res.status(201).json({ message: 'Application submitted', appId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAppliedJobs = async (req, res) => {
    try {
        if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can view applied jobs' });

        const jobs = await Application.findBySeeker(req.user.userId);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
