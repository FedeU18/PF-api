
const { Alumno } = require("../db.js");

const createAlumno = async (req, res) => {
    try {
      const { name,lastname,picture,age,email } = req.body;
  
      const newAlumno = await Alumno.create({
        name,
        lastname,
        picture,
        age,
        email,
        
      });
      res.status(201).send(newAlumno);
    } catch (err) {
      res.status(400).send({ msg: "Erorr en el servidor: ", err: err.message });
    }
  };

  const getAlumno = async (req, res) => {
    const { id } = req.params;
  
    try {
      let alumno = await Alumno.findByPk(id.toUpperCase(), {
        include: Country
      });
      res.send(alumno);
    } catch (err) {
      res.status(400).send({ msg: "Erorr en el servidor: ", err: err.message });
    }
  }

  const editAlumno = async (req, res) => {
    try {
      const { id } = req.params;
      const { name,lastname,age,picture,email } = req.body;
  
      const findAlumno = await Alumno.findByPk(id);
      if (findAlumno) {
        const AlumnoEdited = await Alumno.update(
          {
            name: name.toLowerCase(),
            lastname: lastname.toLowerCase(),
            age: age,
            picture: picture,
            email: email
          },
          {
            where: {
              id,
            },
          }
        );
        res.status(200).json("Cambios guardados");
      } else {
        throw new Error(
          "No se ha encontrado una categoria existente con el id ingresado."
        );
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("hubo un error");
    }
  };

  const deleteAlumno = async (req, res) => {
    try {
      let { id } = req.params;
      let buscarName = await Alumno.findByPk(id);
      if (!buscarName) throw new Error("No se encontro el alumno");
  
      await buscarName.destroy();
      res.status(200).json({ msg: "Se elimino el alumno" });
    } catch (error) {
      res
        .status(400)
        .send({ msg: "Error en el servidor: ", error: error.message });
    }
  };









module.exports = {
    createAlumno,
    getAlumno,
    deleteAlumno,
    editAlumno,
  };

  