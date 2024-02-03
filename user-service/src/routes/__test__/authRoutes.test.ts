import request from 'supertest';
import { app } from '../../app';

it('fails when a username that does not exist is supplied', async () => {
  await request(app)
    .post('/user/login')
    .send({
      email: 'test@test.com',
      password: 'password',
      google: false
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/user/signup')
    .send({
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      phone: 9458473645,
      google: false
    })
    .expect(201);

  await request(app)
    .post('/user/login')
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj',
      google: false
    })
    .expect(400);
});

it('should authenticate and return a token', async () => {
  await request(app)
    .post('/user/signup')
    .send({
        email: 'test@test.com',
        username: 'test',
        password: 'password',
        phone: 9458473645,
        google: false
    })
    .expect(201);
    

  const response = await request(app)
    .post('/user/login')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);
    expect(response.body.token).toBeDefined();
});
