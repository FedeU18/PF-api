const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Materias = require("./materias");
const Search = require("./search");
const Country = require("./country");
const Alumnos = require("./alumno");
const Comentarios = require ("./Comentarios")
const Certificado=require("./certficado")
const Puntajes=require("./Puntuacion")

const Profesor =require("./profesores") 




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", Search);
router.use("/materias", Materias);
router.use("/paises", Country);
router.use("/alumnos", Alumnos);
router.use("/comentarios", Comentarios)
router.use("/certificados", Certificado)
router.use("/puntajes",Puntajes)
router.use("/profesores",Profesor)





module.exports = router;
