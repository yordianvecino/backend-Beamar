const express = require("express");
require("dotenv").config({ path: ".env" });
var cors =require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', require("./routes/contactosRoutes.js"));

app.listen(process.env.PORT, () => {
    console.log("Servidor escuchando el puerto " + process.env.PORT);
})
