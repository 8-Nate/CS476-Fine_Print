import express from 'express';
import { getAllCompanies, getQuestionnaireBySubtype } from '../services/questionnaireService.js';
import { createComplianceReport } from '../services/reportService.js';

const router = express.Router();

// GET /api/companies -> Populate company dropdown
router.get('/companies', async (req, res) => {
  try {
    const companies = await getAllCompanies();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/questionnaire/:subtype -> Load AZ_BC, MN_GBC, or MN_SBC questions
router.get('/questionnaire/:subtype', async (req, res) => {
  try {
    const rule = await getQuestionnaireBySubtype(req.params.subtype);
    res.json(rule);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// POST /api/reports -> Submit questionnaire answers & generate report
router.post('/reports', async (req, res) => {
  try {
    const report = await createComplianceReport(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;