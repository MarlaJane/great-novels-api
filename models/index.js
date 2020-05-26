const Sequelize = require('sequelize')
const allConfigs = (require('../configs/sequelize'))

const authorsModel = require('./authors')
const genresModel = require('./genres')
const novelsModel = require('./novels')
const novelsGenresModel = require('./novelsGenres')

const enviroment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const {
  username, password, database, host, dialect
} = allConfigs[enviroment]

const connection = new Sequelize(username, password, database, { host, dialect })

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
  Sequelize,
}
