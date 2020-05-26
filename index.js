const express = require('express')
const { getAllAuthors, getAuthorByIdOrName } = require('./controllers/authors')
const { getAllGenres, getGenreById } = require('./controllers/genres')
const { getAllNovels, getNovelByIdOrTitle } = require('./controllers/novels')

const app = express()

app.get('/authors', getAllAuthors)

app.get('/authors/:id', getAuthorByIdOrName)

app.get('/genres', getAllGenres)

app.get('/genres/:id', getGenreById)

app.get('/novels', getAllNovels)

app.get('/novels/:id', getNovelByIdOrTitle)

app.listen(2319, () => {
  console.log('Listening on port 2319...') // eslint-disable-line no-console
})

