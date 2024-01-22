const request = require('supertest');
const app = require('../app')

let id;

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /actors debe crear un actor', async () => {
    const newActor = {
        firstName: 'Jony prueba',
        lastName: ' Deep prueba',
        nationality: 'Colombian',
        image: 'https://8080/image',
        birthday: '2020-07-01'
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newActor.firstName);
})

test('GET /actors/:id debe traer un actor por id', async () => {
    const res = await request(app).get(`/actors/${id}`);
    expect(res.status).toBe(200);
})

test('PUT /actors/:id debe actualizar un actor por id', async () => { 
    const actor = {
        firstName: "Jony actualizado"
    }
    const res = await request(app).put(`/actors/${id}`).send(actor)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
 })

test('DELETE /actors/:id debe elinimar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
})