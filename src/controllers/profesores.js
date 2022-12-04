const { Profesor, Materias, Country,Puntuacion,Certificado,Coments, Alumno  } = require("../db.js");

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
      { model:Puntuacion,
        attributes:["puntaje"]
      },
     
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

  let infoId = await Profesor.findByPk(id, {
    include: [
      {
        model: Materias, // va a buscar en el modelo mterias
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      { model: Country },
      { model:Puntuacion,
        include:[
          {model:Alumno,
            attributes:["id","name","lastname","picture"]}
        ]},
      { model:Certificado },
      {model:Coments,
        attributes:["id","contenido","likes"],
      include:[
        {model:Alumno,
          attributes:["id","name","lastname","picture"],
          include:[
            {model:Country}
          ]
        
        },
        {model:Coments,
          attributes:["id","contenido","likes"],
          include:[
            {model:Alumno,
              attributes:["id","name","lastname","picture"],
              include:[
                {model:Country}
              ]
            },
              
            {model:Profesor,
              attributes:["id","nombre","apellido","username","imagen"],
              include:[
                {model:Country}
              ]
              }
          ]}
      ]}
    ],
  });

 if(infoId){
  function SortArray(y, x){
    if (x.id < y.id) {return -1;}
    if (x.id > y.id) {return 1;}
    return 0;
}
  infoId.coments=infoId.coments.sort(SortArray)



 }

  // console.log(infonew);
  try {
    if (!infoId) {
      res.status(404).json({ msg: " no se encontro el profesor" });
    }else{

      res.status(200).json(infoId);
    }

  } catch (e) {
    console.log(e);
  }
};

const postProfe = async (req, res) => {
  const {
    id,
    tipo,
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
        id,
        tipo: "profesor",
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


  try {
    const { id } = req.params;    
    
  const {
    nombre,
    apellido,
    imagen,
    country,
    descripcion,
    descripcion2,
    precio,
    materias,
  } = req.body;

    const findProfesor = await Profesor.findByPk(id);

    var fields = {};
   
    if (nombre) fields.nombre = nombre;
    if (apellido) fields.apellido = apellido;
    if (descripcion) fields.descripcion = descripcion;
    if (descripcion2) fields.descripcion2 = descripcion2;
    if (imagen) fields.imagen = imagen;
    if (precio) fields.precio = precio;
    if (materias) fields.materias = materias;
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

    if (findProfesor) {
      await findProfesor.update(fields);

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

//patch

module.exports = {
  getProfesor,
  getById,
  postProfe,
  deleteProfesor,
  putProfesor,
};
