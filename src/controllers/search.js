const { Profesor, Alumno ,Materias } = require("../db");

const getSimilitudes = async (req, res) => {
    try {
        const {name}=req.query
        
        let matchesAlumno=[] 
        let matchProfesor=[]
     
        let AlumnoData= await Alumno.findAll({
            attributes: ["id", "username","name","lastname","tipo","baneado","picture"],
        })
        let ProfesorData=await Profesor.findAll({
            attributes: ["id", "username","nombre","apellido","tipo","baneado","imagen","administrador"],
            where:{
                administrador:false
              }
        })
        const nameArray=name.split(' ')
        if(AlumnoData){
            nameArray.map((n)=>{                
                AlumnoData.map((u)=>{                    
                     const regex= new RegExp(`${n}`,"gi")                           
                                if(u.username.match(regex)){                                
                                    matchesAlumno.push(u) 
                                }
                                if(u.name !==null){    
                                   if(u.name.match(regex)){                                    
                                       matchesAlumno.push(u)
                                   }
                               }
                               if(u.lastname !==null){    
                                   if(u.lastname.match(regex)){                                    
                                       matchesAlumno.push(u)
                                   }
                               }
                                             
                })
            })            
         }

         if(ProfesorData){
            nameArray.map((n)=>{                    
                ProfesorData.map((p)=>{                    
                     const regex= new RegExp(`${n}`,"gi")                           
                               
                            if(p.username.match(regex)){                                
                                matchProfesor.push(p) 
                            }
                            if(p.nombre !==null){    
                                if(p.nombre.match(regex)){                                    
                                    matchProfesor.push(p)
                                }
                        }
                        if(p.apellido !==null){    
                            if(p.apellido.match(regex)){                                    
                                matchProfesor.push(p)
                            }
                        }
                                            
                })
            })            
         }
         let resultAlumno = matchesAlumno.filter((item,index)=>{
            return matchesAlumno.indexOf(item) === index;
          })

          let resultProfesor = matchProfesor.filter((item,index)=>{
            return matchProfesor.indexOf(item) === index;
          })
          
        res.status(200).json({
            msg:"success",  Alumno:resultAlumno , Profesor:resultProfesor   });
  
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsernames = async (req, res) => {
    try {
        const allNames=[]
        let AlumnoData= await Alumno.findAll({
            attributes: [ "username","name","lastname"],
        })
        let ProfesorData=await Profesor.findAll({
            attributes: ["username","nombre","apellido","administrador"],
            where:{
                administrador:false
              }
        })

        if(AlumnoData){
            AlumnoData.map((a)=>{
                allNames.push(a.username)
                allNames.push(a.name+' '+a.lastname)
            })
        }
        if(ProfesorData){
            ProfesorData.map((p)=>{
                allNames.push(p.username)
                allNames.push(p.nombre+' '+p.apellido)
            })
        }
        res.status(200).json(allNames)
    } catch (error) {
        console.log(error);
    }
  }


  module.exports = {getSimilitudes,getAllUsernames}