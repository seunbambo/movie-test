const Joi = require("joi");
const mongoose = require("mongoose");

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genres: {
      type: String,
      trim: true,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    cast: {
      type: String,
      trim: true,
    },
    comment: {
      type: String,
      trim: true,
    },
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genres: Joi.string().required(),
    year: Joi.number().min(0).required(),
    cast: Joi.string().min(0),
    comment: Joi.string().min(0),
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
