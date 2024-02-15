const { ObjectId } = require("mongodb");
const { Movie } = require("../models/movie");
const { JoiMovie } = require("../models/validate");

// This wil be our movies collection
const getAll = async (req, res) => {
  //#swagger.tags=["Movies"]
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(422).json({ message: err });
  }
};

const getByTitle = async (req, res) => {
  //#swagger.tags=["Movies"]
  try {
    const searchTerm = req.params.title;
    const regex = new RegExp(searchTerm, "i");
    const movieByTitle = await Movie.find({ title: { $regex: regex } });
    if (!movieByTitle || movieByTitle.length === 0) {
      return res.status(404).json({ message: "No matching movies found" });
    }
    res.status(200).json(movieByTitle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createMovie = async (req, res) => {
  //#swagger.tags=["Movies"]
  const movieSchema = {
    title: req.body.title,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    viewerDiscretion: req.body.viewerDiscretion,
    productionCompany: req.body.productionCompany,
    directors: req.body.directors,
    duration: req.body.duration,
    language: req.body.language,
    boxOffice: req.body.boxOffice,
  };

  const { error } = JoiMovie.validate(movieSchema);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  const movie = new Movie(movieSchema);
  try {
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

const updateMovie = async (req, res) => {
  //#swagger.tags=["Movies"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  const movieId = new ObjectId(req.params.id);
  const updatedMovie = {
    title: req.body.title,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    viewerDiscretion: req.body.viewerDiscretion,
    productionCompany: req.body.productionCompany,
    directors: req.body.directors,
    duration: req.body.duration,
    language: req.body.language,
    boxOffice: req.body.boxOffice,
  };

  const { error } = JoiMovie.validate(updatedMovie);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  try {
    const response = await Movie.updateOne(
      { _id: movieId },
      { $set: updatedMovie }
    );
    if (response.modifiedCount > 0) {
      return res.status(204).json({ message: "Movie updated successfully" });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

const deleteMovie = async (req, res) => {
  //#swagger.tags=["Movies"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }

  try {
    const deletedMovie = await Movie.deleteOne({ _id: req.params.id });
    if (deletedMovie.deletedCount > 0) {
      return res.status(204).json({ message: "Movie deleted successfully" });
    } else {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
  getAll,
  getByTitle,
  createMovie,
  updateMovie,
  deleteMovie,
};
