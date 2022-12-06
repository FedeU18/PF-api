const { guardarchat } = require("../controllers/chat.js");
const { mensajesAntiguos } = require("../controllers/chat.js");
const {usuariosChat}=require("../controllers/chat.js")


const eventosSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("nueva conexion");

    socket.on("join_room", (data) => {
      socket.join(data);
    });

    socket.on("mensaje_privado", (data) => {
      guardarchat(data);
      io.to(data.room).emit("mensaje_privado", data);
    });

    socket.on("mensajes_antiguos", async (userLogin, receptor) => {
      const mensajes = await mensajesAntiguos(userLogin, receptor); 
      socket.emit("mensajes_antiguos", mensajes)    
    console.log(mensajes);
    });


    socket.on("usuarios_chat", async()=>{
     let userchat= await usuariosChat()
     console.log(userchat)
     socket.emit("usuarios_chat",userchat)
    })

    socket.on("disconnect", () => {
      console.log("Usuario desconnectado");
    });
  });
};

module.exports = eventosSocket;
