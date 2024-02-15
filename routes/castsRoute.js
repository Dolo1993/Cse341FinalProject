const castRouter = require("express").Router();
const controller = require("../controllers/castsFunction");

castRouter.get("/", controller.getall);
castRouter.post("/", controller.createCastMember);
castRouter.get("/:fullname", controller.getByName);

module.exports = castRouter;
