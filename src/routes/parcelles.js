const express = require('express');
const { pool } = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/parcelles', authenticate, async (req, res) => {
  const { nom, surface_ha, culture } = req.body || {};
  const surface = Number(surface_ha);

  if (!nom || !culture || !(surface > 0)) {
    return res
      .status(400)
      .json({ error: 'nom, culture et surface_ha (supérieure à 0) requis' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO parcelles (user_id, nom, surface_ha, culture) VALUES ($1, $2, $3, $4) RETURNING id, nom, surface_ha, culture',
      [req.user.userId, nom, surface, culture]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erreur serveur' });
  }
});

router.get('/parcelles', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nom, surface_ha, culture FROM parcelles WHERE user_id = $1 ORDER BY id',
      [req.user.userId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erreur serveur' });
  }
});

module.exports = router;