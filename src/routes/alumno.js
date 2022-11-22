const { Router } = require("express");
const {
  createAlumno,
  getAlumno,
  deleteAlumno,
  editAlumno,
} = require("../controllers/alumnos.js");

const router = Router();

router.post("/", createAlumno);
router.get("/:id", getAlumno);
router.delete("/:id", deleteAlumno);
router.patch("/:id", editAlumno);

module.exports = router;
