const { Router } = require("express");
const {getProfesor,getById,postProfe,deleteProfesor,putProfesor,fetchProfesor} = require("../controllers/profesores");

const router = Router();


router.get("/",getProfesor);
router.get("/api",fetchProfesor);
router.get("/:id",getById);
router.post("/",postProfe);
router.delete("/:id",deleteProfesor);
router.patch("/:id",putProfesor);


module.exports = router;