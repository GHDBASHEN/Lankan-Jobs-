import { Job } from '../models/job.js';

export const createJob = async (req, res) => {
  try {
    if (req.user.type !== 'Employer') return res.status(403).json({ message: 'Only employers can post jobs' });

    const { title, description, location, salary, job_type } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const jobId = await Job.create(req.user.userId, title, description, location, salary, job_type, imagePath);
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

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getJobsByEmployer = async (req, res) => {
  try {
    if (req.user.type !== 'Employer') return res.status(403).json({ message: 'Only employers can view their jobs' });
    const jobs = await Job.findByEmployerId(req.user.userId);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    if (req.user.type !== 'Employer') return res.status(403).json({ message: 'Only employers can update jobs' });

    const { title, description, location, salary, job_type } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.employer_id !== req.user.userId) return res.status(403).json({ message: 'Unauthorized' });

    const imagePath = req.file ? `/uploads/${req.file.filename}` : job.image_path;

    await Job.update(req.params.id, title, description, location, salary, job_type, imagePath);
    res.json({ message: 'Job updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    if (req.user.type !== 'Employer') return res.status(403).json({ message: 'Only employers can delete jobs' });
    
    const job = await Job.findById(req.params.id);

    if (job.employer_id !== req.user.userId) return res.status(403).json({ message: 'Unauthorized' });
    
    await Job.delete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};