const { Router } = require("express");
const {
    createComent
    ,editComent,
    eliminarComent,
    createComentonComent,
    getComentsByProfeId}=require('../controllers/Comentarios')

const router = Router();


router.get('/:id',getComentsByProfeId)
router.post("/", createComent);
router.post("/coment/", createComentonComent);
router.delete("/:id", eliminarComent);
router.patch("/:id", editComent);
module.exports = router;