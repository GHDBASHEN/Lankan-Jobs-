import { ApplicationModel } from '../models/application.js';
import { ResumeModel } from '../models/resume.js';

export const applyJob = async (req, res) => {
  try {
    if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can apply' });

    const { job_id } = req.body;
    const app = await ApplicationModel.create(job_id, req.user.userId);
    res.status(201).json({ message: 'Application submitted', appId: app._id });
  } catch (err) {
    console.error('Apply Job Error:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getAppliedJobs = async (req, res) => {
    try {
        if (req.user.type !== 'Job Seeker') return res.status(403).json({ message: 'Only job seekers can view applied jobs' });

        const applications = await ApplicationModel.findBySeeker(req.user.userId);
        // Extract just the job data from populated applications
        const jobs = applications.map(app => app.job_id);
        res.json(jobs);
    } catch (err) {
        console.error('Get Applied Jobs Error:', err);
        res.status(500).json({ message: err.message });
    }
};

export const getApplicantsByJob = async (req, res) => {
    try {
        if (req.user.type !== 'Employer') return res.status(403).json({ message: 'Only employers can view applicants' });
        const applicants = await ApplicationModel.findByJob(req.params.id);
        
        // Fetch resume information for each applicant
        const applicantsWithResume = await Promise.all(
          applicants.map(async (app) => {
            const resume = await ResumeModel.findBySeeker(app.seeker_id._id);
            return {
              user_id: app.seeker_id._id,
              name: app.seeker_id.name,
              email: app.seeker_id.email,
              file_path: resume ? resume.file_path : null
            };
          })
        );
        
        res.json(applicantsWithResume);
    } catch (err) {
        console.error('Get Applicants By Job Error:', err);
        res.status(500).json({ message: err.message });
    }
};
