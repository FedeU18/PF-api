const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Materias = require("./materias");
const Search = require("./search");
const Country = require("./country");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", Search);
router.use("/materias", Materias);
router.use("/paises", Country);
module.exports = router;
