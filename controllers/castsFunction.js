const { Cast } = require("../models/movie");
const { JoiCast } = require("../models/validate");

const getall = async (req, res) => {
  //#swagger.tags=["Cast"]
  try {
    const castCrew = await Cast.find();
    res.status(200).json(castCrew);
  } catch (err) {
    res.status(422).json({ message: err });
  }
};

const getByName = async (req, res) => {
  //#swagger.tags=["Cast"]
  try {
    const searchTerm = req.params.fullname;
    const regex = new RegExp(searchTerm, "i");
    const castByName = await Cast.find({ fullname: { $regex: regex } });
    if (!castByName || castByName.length === 0) {
      return res.status(404).json({ message: "No matching cast member found" });
    }
    res.status(200).json(castByName);
  } catch (err) {
    console.error("Error in getByName:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createCastMember = async (req, res) => {
  //#swagger.tags=["Cast"]
  const castSchema = {
    fullname: req.body.fullname,
    dob: req.body.dob,
    pob: req.body.pob,
    gender: req.body.gender,
    nationality: req.body.nationality,
    biography: req.body.biography,
  };
  const { error } = JoiCast.validate(castSchema);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  const cast = new Cast(castSchema);
  try {
    const savedCast = await cast.save();
    res.status(201).json(savedCast);
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

module.exports = {
  getall,
  getByName,
  createCastMember,
};
