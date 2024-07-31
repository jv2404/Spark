const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(express.json());

app.get('/hello', async (req, res) => {
    try {
        res.send(200).send('Hello World!');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Endpoint to submit Spark job
app.post('/submit-job', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8998/batches', req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to check job status
app.get('/job-status/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:8998/batches/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve job result
app.get('/job-result/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:8998/batches/${req.params.id}/state`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
