const express = require('express')
const json = require('./Mocks/HorrorMovies.json')
const pc = require('picocolors')
const { validMovie } = require('./modules/MoviesSchemas')
const app = express()
const port = process.env.PORT ?? 3000

app.disable('x-powered-by')
app.use(express.static('public'))


app.get('/movies', (req, res) => {
  const { title } = req.query
  if (title) {
    const movieJSON = json.Search.filter((movie) => movie.Title.includes(title))
    return res.json({
      Search: movieJSON,
      totalResults: movieJSON.length,
      Response: true
    })
  }
  res.json(json)
})
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  if (json.Search[id - 1]) {
    const movieJSON = json.Search[id - 1]
    return res.json({
      Search: movieJSON,
      totalResults: movieJSON.length,
      Response: true
    })
  }

  res.status(404).json({ Message: 'Not Found', Response: false })
})

app.post('/movies', (req, res) => {
  const result = validMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  json.Search.push(result)
  res.status(201).json(result.data)
})

app.use((req, res) => {
  res.status(404).json({ Error: '404', Message: 'Not Found' })
})

app.listen(port, () => {
  console.log(pc.blue(`App listening on port http://localhost:${port}`))
})
