const movieRouter = require("express").Router();
const controller = require("../controllers/moviesFunction");

movieRouter.get("/", controller.getAll);
movieRouter.get("/:title", controller.getByTitle);
movieRouter.post("/", controller.createMovie);
movieRouter.put("/:id", controller.updateMovie);
movieRouter.delete("/:id", controller.deleteMovie);

module.exports = movieRouter;
