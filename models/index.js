const Sequelize = require('sequelize')
const authorsModel = require('./authors')
const genresModel = require('./genres')
const novelsModel = require('./novels')
const novelsGenresModel = require('./novelsGenres')

const connection = new Sequelize('novels', 'novels', 'g00dr3@d$!', {
  host: 'localhost', dialect: 'mysql'
})

const authors = authorsModel(connection, Sequelize)
const genres = genresModel(connection, Sequelize)
const novels = novelsModel(connection, Sequelize, authors)
const novelsGenres = novelsGenresModel(connection, Sequelize, genres, novels)

novels.belongsTo(authors)
authors.hasMany(novels)

genres.belongsToMany(novels, { through: novelsGenres })
novels.belongsToMany(genres, { through: novelsGenres })

module.exports = {
  authors,
  genres,
  novels,
  novelsGenres,
}
