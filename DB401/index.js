require('./database-connection')

const Comment = require('./models/comment')
const Movie = require('./models/movie')
const Theater = require('./models/theater')

async function main() {
  //const res = await Movie.aggregate([{ $group: { _id: '$genres', movies: { $push: '$genreId' } } }])
  //group by genre and push the movie id into an array
  const res = await Movie.aggregate([
    // group by genre and calculate the average rating for each group
    {
      $group: {
        _id: '$genres',
        averageRating: { $avg: '$imdb.rating' },
        movies: { $push: '$$ROOT' },
      },
    },

    //group by genre , sort by rating and push the movie id into an array

    { $unwind: '$genres' },

    {
      $group: {
        _id: '$genres',
        movies: { $push: '$title' },
        numberOfMovies: { $sum: 1 },
        avgRating: { $avg: '$imdb.rating' },
      },
    },
    { $sort: { avgRating: -1 } },
  ])

  console.log(res)
}

main()
