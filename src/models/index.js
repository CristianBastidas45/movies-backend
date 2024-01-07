const Actor = require('./Actor')
const Director = require('./Director')
const Genre = require('./Genre')
const Movie = require('./Movie')

Genre.belongsToMany(Movie, {through: 'GenresMovies'})
Movie.belongsToMany(Genre, {through: 'GenresMovies'})

Actor.belongsToMany(Movie, {through: 'ActorsMovies'})
Movie.belongsToMany(Actor, {through: 'ActorsMovies'})


Director.belongsToMany(Movie, {through: 'DirectorsMovies'})
Movie.belongsToMany(Director, {through: 'DirectorsMovies'})

