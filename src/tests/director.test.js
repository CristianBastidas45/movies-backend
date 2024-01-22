const request = require('supertest');
const app = require('../app')
let id;

test('GET /directors debe traer todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /directors debe crear un director', async () => {
    const newDirector = {
        firstName: 'Director prueba',
        lastName: ' Famoso prueba',
        nationality: 'Colombian',
        image: 'https://8080/image',
        birthday: '2020-07-01'
    }
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newDirector.firstName);
})

test('GET /directors/:id debe traer un director por id', async () => {
    const res = await request(app).get(`/directors/${id}`);
    expect(res.status).toBe(200);
})

test('PUT /directors/:id debe actualizar un director por id', async () => { 
    const director = {
        firstName: "Director actualizado"
    }
    const res = await request(app).put(`/directors/${id}`).send(director)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
 })

test('DELETE /directors/:id debe elinimar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
})