const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'RoadView', version: '1.0.0' });
});

app.get('/', (req, res) => {
  res.json({
    name: 'RoadView',
    description: 'Creative Suite - Design, Video, AI Generation',
    features: [
      'Canva-like design tools',
      'Adobe-style editing',
      'AI image generation',
      'Video creation (Veo3)',
      'YouTube integration',
    ],
  });
});

app.listen(PORT, () => console.log('RoadView running on port ' + PORT));
