const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

const token = jwt.sign(
  { userId: 1, email: 'ali@mail.com' },
  process.env.JWT_SECRET || 'dev-secret-change-me'
);

describe('POST /arrosages', () => {
  it('refuse une requête sans jeton', async () => {
    const res = await request(app).post('/arrosages').send({});
    expect(res.statusCode).toBe(401);
  });

  it('refuse des données incomplètes avec un jeton valide', async () => {
    const res = await request(app)
      .post('/arrosages')
      .set('Authorization', `Bearer ${token}`)
      .send({ parcelle_id: 1 });
    expect(res.statusCode).toBe(400);
  });
});