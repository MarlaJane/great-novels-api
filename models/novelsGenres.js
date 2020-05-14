const novelsGenres = (connection, Sequelize, genres, novels) => {
  return connection.define('novelsGenres', {
    genreId: { type: Sequelize.INTEGER, references: { model: genres, key: 'id' } },
    novelId: { type: Sequelize.INTEGER, references: { model: novels, key: 'id' } },
  })
}

module.exports = novelsGenres
