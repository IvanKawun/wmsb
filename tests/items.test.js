const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const app = require('../src/app');

let server;

beforeAll((done) => {
    server = app.listen(4000, done);
});

afterAll((done) => {
    server.close(done);
});

test('GET /api/items returns the list of items', async () => {
    await Item.create({ name: 'Beer', quantity: 10, price: 3.5, description: 'Tasty', type: 'beer' });
    const res = await request(server).get('/api/items').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Beer');
});
