const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./specification.json');
const { default: log } = require('./helpers/log');

app.use('/reference/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => {
    log("Server running on port 3000!");
    log("");
    log("API Root - http://localhost:3000");
    log("Reference - http://localhost:3000/reference");
})