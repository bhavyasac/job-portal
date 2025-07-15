import express from 'express';
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();

// company registration
router.post('/register', upload.single('image'), registerCompany)

// company login
router.post('/login', loginCompany)

// get company data
router.get('/company', protectCompany ,getCompanyData)

//post a new job
router.post('/post-job', protectCompany , postJob)

// get company job applicants
router.get('/applicants', protectCompany , getCompanyJobApplicants)

// get a company's jobs list
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

// change job application status
router.post('/change-status', protectCompany, changeJobApplicationsStatus)

// change job visibility
router.post('/change-visibility', protectCompany, changeVisibility)

export default router;