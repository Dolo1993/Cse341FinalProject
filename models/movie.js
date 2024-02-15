const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  title: String,
  genre: String,
  releaseDate: Date,
  viewerDiscretion: String,
  productionCompany: String,
  directors: String,
  duration: String,
  language: String,
  boxOffice: Number,
});

const CastSchema = mongoose.Schema({
  fullname: String,
  dob: Date,
  pob: String,
  gender: String,
  nationality: String,
  biography: String,
});

const UserRatingSchema = mongoose.Schema({
  rating: String,
  comments: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.Schema({});

const Movie = mongoose.model("movie", MovieSchema);
const Cast = mongoose.model("harry_potter_cast", CastSchema);
const Ratings = mongoose.model("ratings", UserRatingSchema);

module.exports = { Movie, Cast, Ratings };
