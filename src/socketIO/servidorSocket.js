const eventosSocket = (io) => {
  let usuarios = [];
  var userOnline = {};

  io.on("connection", (socket) => {
    console.log("nueva conexion");
    let userName = "";
    socket.on("mensaje", (data) => {
      console.log(data);
      socket.to(data.room).emit("mensaje_privado", data);
    });

    socket.on("logearAlumno", (datos) => {
      console.log("soy datos de nuevo usuario", datos);
      const alumno = usuarios.filter((e) => e === datos);
      if (alumno.length) {
        console.log("entre");
        socket.emit("logearAlumno", { status: "denegado" });
      } else {
        usuarios.push(datos);
        userName = datos;
        userOnline[userName] = socket.id;
        console.log(usuarios);
        socket.emit("logearAlumno", {
          status: "aceptado",
          data: { nombre: datos, id: socket.id, tipo: "alumno" },
        });

        socket.emit("usuariosIniciados", {
          status: "aceptado",
          data: usuarios,
        });
      }
    });

    socket.on("loguearProfesor", (datos) => {
      console.log("soy datos de nuevo usuario", datos);
      const profesor = usuarios.filter((e) => e === datos);
      if (profesor.length) {
        socket.emit("loguearProfesor", { status: "denegado" });
      } else {
        usuarios.push(datos);
        userName = datos;
        userOnline[userName] = socket.id;
        console.log("soy usuarios", usuarios);
        socket.emit("loguearProfesor", {
          status: "aceptado",
          data: { nombre: datos, id: socket.id, tipo: "profesor" },
        });

        socket.emit("usuariosIniciados", {
          status: "aceptado",
          data: UsuariosConectados(),
        });
      }
    });

    socket.emit("usuariosIniciados", {
      status: "success",
      data: UsuariosConectados(), //debuelve arreglo de usuarios online
    });

    socket.on("join_room", (data) => {
      socket.join(data);
    });

    socket.on("mensaje_privado", (data) => {
      if (
        !userOnline[data.recibido] ||
        !userOnline[data.remitente] ||
        !data.mensaje
      )
        return;

      io.to(data.room).emit("mensaje_privado", data);
    });

    socket.on("desconectar", (name) => {
      if (!name) return;
      else {
        delete userOnline[name];
        usuarios.splice(usuarios.indexOf(name), 1);
        socket.on("disconnect", () => {
          io.emit("usuariosIniciados", {
            status: "success",
            data: UsuariosConectados(),
          });
        });
      }
    });
  });

  const UsuariosConectados = () => {
    let result = [];
    for (let i in userOnline) {
      result.push(i);
    }
    return result;
  };
};

module.exports = eventosSocket;
