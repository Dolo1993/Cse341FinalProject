const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware
  } else {
    // User is not authenticated, redirect to the home page or display an error message
    res.redirect("/");
  }
};

// Route for serving Swagger UI
router.use("/api-docs", isAuthenticated, swaggerUi.serve);
router.get("/api-docs", isAuthenticated, swaggerUi.setup(swaggerDocument));

module.exports = router;
