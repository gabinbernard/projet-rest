const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./specification.json');
const { default: log } = require('./helpers/log');

const PORT = 3000;

app.use('/reference/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
    log();
    log("Server running on port 3000!");
    log();
    log("API Root - http://localhost:3000");
    log("Reference - http://localhost:3000/reference");
    log();
    log("----------------------------------------------");
    log();

})