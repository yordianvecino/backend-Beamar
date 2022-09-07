const express = require("express");
require("dotenv").config({ path: ".env" });
const app = express();

app.use(express.json());

app.use('/', require("./routes/usuariosRoutes.js"));

app.listen(process.env.PORT, () => {
    console.log("Servidor escuchando el puerto " + process.env.PORT);
})
