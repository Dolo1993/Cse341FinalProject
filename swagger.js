const swaggerAutogen = require("swagger-autogen")(); 

const doc = {
    info: {
        title: "Movies Api",
        description: "API for managing movie-related data"
    },
    host: "final-project-qesp.onrender.com",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);