import { Resume } from '../models/resume.js';

export const uploadResume = async (req, res) => {
  try {
    if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can upload resumes' });

    const filePath = `/uploads/${req.file.filename}`;
    const resume = await Resume.findBySeeker(req.user.userId);
    if (resume) {
      await Resume.update(req.user.userId, filePath);
      res.status(200).json({ message: 'Resume updated' });
    } else {
      const resumeId = await Resume.create(req.user.userId, filePath);
      res.status(201).json({ message: 'Resume uploaded', resumeId });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteResume = async (req, res) => {
    try {
        if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can delete resumes' });
        await Resume.delete(req.user.userId);
        res.json({ message: 'Resume deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}