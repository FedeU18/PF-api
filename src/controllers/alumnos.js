//prueba22
const { Alumno } = require("../db.js");

const createAlumno = async (req, res) => {
    try {
      const { name,surname,picture,age,email } = req.body;
  
      const newAlumno = await Alumno.create({
        name,
        surname,
        picture,
        age,
        email,
        
      });
      res.status(201).send(newAlumno);
    } catch (err) {
      res.status(400).send({ msg: "Erorr en el servidor: ", err: err.message });
    }
  };











module.exports = {
    createAlumno,
    //getAlumno,
    //deleteAlumno,
    //editAlumno,
  };

  