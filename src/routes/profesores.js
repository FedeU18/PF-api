const { Router } = require("express");
const {getProfesor,getById,postProfe,deleteProfesor,putProfesor} = require("../controllers/profesores");

const router = Router();


router.get("/",getProfesor);
router.get("/:id",getById);
router.post("/",postProfe);
router.delete("/:id",deleteProfesor);
router.put("/:id",putProfesor);


module.exports = router;