import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/api.js';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check & route index
app.get('/', (req, res) => {
  res.json({
    status: 'Paper Promises API ready',
    endpoints: ['/api/companies', '/api/questionnaire/:subtype', '/api/reports'],
  });
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});