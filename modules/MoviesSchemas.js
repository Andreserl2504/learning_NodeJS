const z = require('zod')

const movieSchema = z.object({
  Title: z.string({
    invalid_type_error: 'Invalid title',
    required_error: 'Movie Title required'
  }),
  Year: z.string({
    invalid_type_error: 'Invalid year',
    required_error: 'Movie year required'
  }),
  imdbID: z.string({ invalid_type_error: 'Invalid IMDBID' }),
  Type: z.enum(['movie', 'series']),
  Poster: z.string().url()
})

//   Year: z.number().int().min(1900).max(2024, {
//     invalid_type_error: 'Invalid Year',
//     required_error: 'Movie Title required'
//   }),
function validMovie(object) {
  return movieSchema.safeParse(object)
}

module.exports = { validMovie }
