const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'irrigation-service' });
});
app.use('/', require('./routes/parcelles'));
app.use('/', require('./routes/arrosages'));
module.exports = app;