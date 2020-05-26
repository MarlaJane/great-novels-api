const models = require('../models')

const getAllAuthors = async (request, response) => {
  const authors = await models.authors.findAll()

  return response.send(authors)
}

const getAuthorByIdOrName = async (request, response) => {
  const { id } = request.params

  const author = await models.authors.findOne({
    where: {
      [models.Sequelize.Op.or]: [
        { id: id },
        { nameLast: { [models.Sequelize.Op.Like]: `%${id}` } },
      ]
    },
    include: [{
      model: models.novels,
      include: [{ model: models.genres }]
    }]
  })

  return author
    ? response.send(author)
    : response.sendStatus(404)
}


module.exports = { getAllAuthors, getAuthorByIdOrName }
