import { ResumeModel } from '../models/resume.js';

export const uploadResume = async (req, res) => {
  try {
    if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can upload resumes' });

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = `/uploads/${req.file.filename}`;
    const resume = await ResumeModel.findBySeeker(req.user.userId);
    if (resume) {
      await ResumeModel.update(req.user.userId, filePath);
      res.status(200).json({ message: 'Resume updated' });
    } else {
      const newResume = await ResumeModel.create(req.user.userId, filePath);
      res.status(201).json({ message: 'Resume uploaded', resumeId: newResume._id });
    }
  } catch (err) {
    console.error('Upload Resume Error:', err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteResume = async (req, res) => {
    try {
        if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can delete resumes' });
        await ResumeModel.delete(req.user.userId);
        res.json({ message: 'Resume deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const checkResume = async (req, res) => {
    try {
        if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can have a resume' });
        const resume = await ResumeModel.findBySeeker(req.user.userId);
        res.json({ hasResume: !!resume });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};