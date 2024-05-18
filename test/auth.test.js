require('dotenv').config(); 
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECT_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  let token;
  it('should be able to register a user', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/register')
      .send({
        firstname: 'test',
        lastname: 'user',
        email: 'test@gmail.com',
        password: 'horizon#'
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.message).toEqual('Registration Successful');
  });

  it('should not allow duplicate emails during registration', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/register')
      .send({
        firstname: 'test1',
        lastname: 'user1',
        email: 'test@gmail.com', 
        password: 'secretkey'
      });

    expect(response.statusCode).toEqual(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('riseam@gmail.com Already Exist!!!');
  });

 it('should login a user', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'horizon#'
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('user');
    token = response.body.user;
  });

  it('should not login with incorrect credentials', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty('message');
  });

  it('should logout a user', async () => {
    const response = await supertest(app)
      .get('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });

});


