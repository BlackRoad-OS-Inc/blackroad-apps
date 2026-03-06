const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'RoadSide', version: '1.0.0' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'RoadSide', version: '1.0.0' });
});

app.get('/', (req, res) => {
  res.json({
    name: 'RoadSide',
    description: 'Connections, Deploy & DNS Management Portal',
    features: [
      'Server connections management',
      'Deployment dashboard',
      'DNS configuration',
      'CLI integration',
      'Real-time status',
    ],
  });
});

app.listen(PORT, () => console.log('RoadSide running on port ' + PORT));
