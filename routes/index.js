const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/movies/", require("./moviesRoute"));

router.use("/cast/", require("./castsRoute"));

// This is our oauth authentication route...
// router.use("/auth/google", require("../controllers/google-auth"));
router.use("/auth/github", require("../controllers/github-auth"));

// This is the root path handler
router.get("/", (req, res) => {
  res.render("auth");
});

module.exports = router;
