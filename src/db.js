const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5433,
  user: process.env.DB_USER || 'agri',
  password: process.env.DB_PASSWORD || 'agri123',
  database: process.env.DB_NAME || 'irrigation_db',
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS parcelles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      nom VARCHAR(100) NOT NULL,
      surface_ha NUMERIC(10, 2) NOT NULL,
      culture VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS arrosages (
      id SERIAL PRIMARY KEY,
      parcelle_id INTEGER NOT NULL REFERENCES parcelles(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL,
      date_arrosage DATE NOT NULL,
      duree_min INTEGER NOT NULL,
      volume_l NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

module.exports = { pool, initDb };