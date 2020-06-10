const models = require('../models')

const getAllNovels = async (request, response) => {
  try {
    const novels = await models.novels.findAll({ include: [{ model: models.authors }, { model: models.genres }] })

    return response.send(novels)
  } catch (error) {
    return response.status(500).send('Unkown error while retrieving novels')
  }
}

const getNovelByIdOrTitle = async (request, response) => {
  try {
    const { identifier } = (request.params)

    const novel = await models.novels.findOne({
      where: {
        [models.Sequelize.Op.or]: [
          { id: identifier },
          { title: { [models.Sequelize.Op.like]: '%${ identifier }%' } }
        ]
      },
      include: [{ model: models.authors }, { model: models.genres }]
    })

    return novel
      ? response.send(novel)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unkown error while retrieving novels')
  }
}

module.exports = {
  getAllNovels,
  getNovelByIdOrTitle,
}
