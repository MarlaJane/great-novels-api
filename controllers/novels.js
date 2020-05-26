const models = require('../models')

const getAllNovels = async (request, response) => {
  const novels = await models.novels.findAll({
    include: [{ model: models.authors }, { model: models.Genres }]
  })

  return response.send(novels)
}

const getNovelByIdOrTitle = async (request, response) => {
  const { id } = request.params

  const novel = await models.novels.findOne({
    where: {
      [models.sequelize.op.or]: [
        { id: id },
        { title: { [models.sequelize.op.like]: '%&{ id }%' } }
      ]
    },
    include: [{ model: models.authors }, { model: models.Genres }]
  })

  return novel
    ? response.send(novel)
    : response.sendStatus(404)
}

module.exports = { getAllNovels, getNovelByIdOrTitle }
