const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Load config from .env
const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN;
const DATABRICKS_URL = 'https://dbc-5fa907b7-2ea4.cloud.databricks.com/api/2.1/jobs/run-now';
const JOB_ID = 1108444824496114;

console.log('Loaded token:', DATABRICKS_TOKEN);


app.get('/run-databricks-job', async (req, res) => {
  try {
    const response = await axios.post(
      DATABRICKS_URL,
      { job_id: JOB_ID },
      {
        headers: {
          Authorization: `Bearer ${DATABRICKS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ success: true, run_id: response.data.run_id });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
