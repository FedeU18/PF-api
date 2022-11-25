const { Alumno, Country } = require("../db.js");

const createAlumno = async (req, res) => {
  const { name, lastname, picture, age, email, country } = req.body;
  try {
    console.log(country[0].toUpperCase() + country.substring(1));
    let pais = await Country.findOne({
      where: { name: country[0].toUpperCase() + country.substring(1) },
    });
    console.log("este es el pais encontrado ", pais.id);
    const [objAlumno, created] = await Alumno.findOrCreate({
      where: { email },
      defaults: {
        name,
        lastname,
        picture,
        age,
        email,
        countryId: pais.id,
      },
    });
    if (created) {
      res.status(200).send("alumno creado con exito");
    } else res.send("error al crear el alumno");
  } catch (err) {
    res.status(400).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const getAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    let alumno = await Alumno.findOne({
      where: { id },
      include: [{ model: Country }],
    });
    let objAlumno = {
      id: alumno.id,
      name: alumno.name[0].toUpperCase() + alumno.name.substring(1),
      lastname: alumno.lastname[0].toUpperCase() + alumno.lastname.substring(1),
      age: alumno.age,
      email: alumno.email,
      picture: alumno.picture,
      country: alumno.country.name,
    };

    res.send(alumno ? objAlumno : "alumno no encontrado");
  } catch (err) {
    res.status(400).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const getAllAlumnos = async (req, res) => {
  return Alumno.findAll({})
    .then((alumnos) => {
        res.send(alumnos)
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error en el servidor: ", err: err.message });
    })

  
};

const editAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, age, picture, email, country } = req.body;

    console.log("holaa lllegue linea 60");

    const findAlumno = await Alumno.findByPk(id);
    console.log(findAlumno);
    var fields = {};
    fields.apellidos = "luna";
    if (name) fields.name = name;
    if (lastname) fields.lastname = lastname;
    if (age) fields.age = age;
    if (picture) fields.picture = picture;
    if (email) fields.email = email;
    if (country) {
      let pais = await Country.findOne({
        where: { name: country[0].toUpperCase() + country.substring(1) },
      });
      if (pais) {
        fields.countryId = pais.id;
      }
    }
    console.log(fields);
    if (fields === {})
      throw new Error("No se recibieron parametros para cambiar");

    if (findAlumno) {
      await findAlumno.update(fields);

      res.status(200).send("Cambios guardados");
    } else {
      throw new Error(
        "No se ha encontrado una categoria existente con el id ingresado."
      );
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(fields);
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
  getAllAlumnos,
  deleteAlumno,
  editAlumno,
};
