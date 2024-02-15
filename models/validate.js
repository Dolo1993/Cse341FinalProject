const Joi = require("joi");

const JoiMovie = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  releaseDate: Joi.date().required(),
  viewerDiscretion: Joi.string().required(),
  productionCompany: Joi.string().required(),
  directors: Joi.string().required(),
  duration: Joi.string().required(),
  language: Joi.string().required(),
  boxOffice: Joi.number().min(0),
}).options({ allowUnknown: true, stripUnknown: true });

const JoiCast = Joi.object({
  fullname: Joi.string().required(),
  dob: Joi.date().required(),
  pob: Joi.string().required(),
  gender: Joi.string().required(),
  nationality: Joi.string(),
  biography: Joi.string(),
}).options({ allowUnknown: true, stripUnknown: true });

module.exports = {
  JoiMovie,
  JoiCast,
};
