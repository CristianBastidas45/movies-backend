const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
let id;
require('../models')

test('GET /movies debe traer todos los peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /movies debe crear una pelicula', async () => {
    const newMovie = {
        name: 'Piratas prueba',
        image: 'https://8080/imageMovie',
        synopsis: 'El resumen de la pelicula',
        releaseYear: 2010
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
})

test('GET /movies/:id debe traer una pelicula por id', async () => {
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
})

test('PUT /movies/:id debe actualizar una pelicula por id', async () => {
    const movie = {
        name: "Piratas actualizado"
    }
    const res = await request(app).put(`/movies/${id}`).send(movie)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
})

test('POST /movies/:id/actors debe agregar actores a una pelicula', async () => {
    const actor = await Actor.create({
        firstName: 'Jony prueba',
        lastName: ' Deep prueba',
        nationality: 'Colombian',
        image: 'https://8080/image',
        birthday: '2020-07-01'
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})

test('POST /movies/:id/directors debe agregar directores a una pelicula', async () => {
    const director = await Director.create({
        firstName: 'Director prueba',
        lastName: ' Famoso prueba',
        nationality: 'Colombian',
        image: 'https://8080/image',
        birthday: '2020-07-01'
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})

test('POST /movies/:id/genres debe agregar generos a una pelicula', async () => {
    const genre = await Genre.create({
        name: 'comedia prueba'
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})

test('DELETE /movies/:id debe elinimar una pelicula', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
})