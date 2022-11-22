const { Alumno } = require("../db.js");

const createAlumno = async (req, res) => {
  const { name, lastname, picture, age, email } = req.body;
  try {
    const [objAlumno, created] = await Alumno.findOrCreate({
      where: { email },
      defaults: {
        name,
        lastname,
        picture,
        age,
        email,
      },
    });
    if (created) res.status(200).send("alumno creado con exito");
    else res.send("error al crear el alumno");
  } catch (err) {
    res.status(400).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const getAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    let alumno = await Alumno.findOne({
      where: { id },
    });
    res.send(alumno);
  } catch (err) {
    res.status(400).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const editAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, age, picture, email } = req.body;

    const findAlumno = await Alumno.findByPk(id);
    if (findAlumno) {
      const AlumnoEdited = await Alumno.update(
        {
          name: name.toLowerCase(),
          lastname: lastname.toLowerCase(),
          age: age,
          picture: picture,
          email: email,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).send("Cambios guardados");
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
    res.status(200).send("alumno eliminado exitosamente");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createAlumno,
  getAlumno,
  deleteAlumno,
  editAlumno,
};
