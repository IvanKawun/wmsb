jest.mock('nodemailer');
const nodemailer = require('nodemailer');

const request = require('supertest');
const app = require('../app');
const setup = require('./setupMongo');
const Order = require('../models/Order');

beforeAll(async () => { await setup.connect(); });
afterEach(async () => { await setup.clearDatabase(); nodemailer.__sendMailMock.mockClear(); });
afterAll(async () => { await setup.closeDatabase(); });

test('POST /api/orders створює order і викликає sendMail', async () => {
    const orderPayload = {
        customerName: 'Ivan',
        customerEmail: 'ivan@example.com',
        providerEmail: 'provider@example.com',
        products: [{ name: 'Beer', price: 2, quantity: 3 }],
        totalPrice: 6,
        comment: 'Please deliver'
    };

    const res = await request(app)
        .post('/api/orders')
        .send(orderPayload)
        .set('Accept', 'application/json')
        .expect(201);

    const orderInDb = await Order.findById(res.body._id);
    expect(orderInDb).not.toBeNull();
    expect(orderInDb.customerName).toBe('Ivan');

    expect(nodemailer.__sendMailMock).toHaveBeenCalled();
});
