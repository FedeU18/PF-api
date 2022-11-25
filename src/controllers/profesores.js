const { Profesor, Materias, Country } = require("../db.js");

const getProfesor = async (req, res) => {
  let { nombre } = req.query;

  let info = await Profesor.findAll({
    include: [
      {
        model: Materias, // va a buscar en el modelo mterias
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      { model: Country },
    ],
  });

  try {
    if (nombre) {
      let nameProfe = await info.filter((e) =>
        e.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      console.log(nameProfe);

      nameProfe.length
        ? res.status(200).json(nameProfe)
        : res.status(404).json({ msg: "no se encontro profesor" });
    } else {
      res.status(200).json(info);
    }
  } catch (e) {
    res.status(404).json({ msg: "no se encontro bro " });
  }
};

const getById = async (req, res) => {
  let { id } = req.params;

  const infoId = await Profesor.findByPk(id, {
    include: [
      {
        model: Materias, // va a buscar en el modelo mterias
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      { model: Country },
    ],
  });

  console.log(infoId);
  try {
    if (!infoId) {
      res.status(404).json({ msg: " no se encontro el profesor" });
    }

    res.status(200).json(infoId);
  } catch (e) {
    console.log(e);
  }
};

const postProfe = async (req, res) => {
  const {
    nombre,
    apellido,
    username,
    imagen,
    email,
    pais,
    puntuacion,
    descripcion,
    precio,
    estudios,
    materias,
  } = req.body;

  console.log(req.body);
  try {
    let findPais = await Country.findOne({
      where: { name: pais },
    });

    if (findPais) {
      let NewProfesor = await Profesor.create({
        nombre,
        apellido,
        username,
        imagen,
        email,
        countryId: findPais.id,
        puntuacion,
        descripcion,
        precio,
        estudios,
      });

      await NewProfesor.setMaterias(await materias);
    }

    res.status(200).send("perfil Creado Correctamente");
  } catch (e) {
    console.log(e);
  }
};

//

// para borrar del todo !
const deleteProfesor = async (req, res) => {
  const { id } = req.params;
  try {
    await Profesor.destroy({ where: { id: id } });

    res.status(200).json({ msg: "Usuario borrado correctamente!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//put
const putProfesor = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    username,
    image,
    email,
    pais,
    puntuacion,
    descripcion,
    precio,
    estudios,
    materias,
  } = req.body;
  try {
    const updateProfesor = await Profesor.findByPk(id);
    updateProfesor.nombre = nombre;
    updateProfesor.apellido = apellido;
    updateProfesor.username = username;
    updateProfesor.image = image;
    updateProfesor.email = email;
    updateProfesor.pais = pais;
    updateProfesor.puntuacion = puntuacion;
    updateProfesor.descripcion = descripcion;
    updateProfesor.precio = precio;
    updateProfesor.estudios = estudios;
    updateProfesor.materias = materias;
    await updateProfesor.save();
    res.status(200).json({ msg: "cambios realizados correctamente " });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//patch

module.exports = {
  getProfesor,
  getById,
  postProfe,
  deleteProfesor,
  putProfesor,
};
