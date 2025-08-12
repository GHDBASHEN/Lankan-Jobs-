import { Resume } from '../models/resume.js';

export const uploadResume = async (req, res) => {
  try {
    if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can upload resumes' });

    const filePath = `/uploads/${req.file.filename}`;
    const resumeId = await Resume.create(req.user.userId, filePath);
    res.status(201).json({ message: 'Resume uploaded', resumeId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
