const eventosSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("nueva conexion");

    socket.on("join_room", (data) => {
      socket.join(data);
    });

    socket.on("mensaje_privado", (data) => {
      io.to(data.room).emit("mensaje_privado", data);
    });

    socket.on("disconnect", () => {
      console.log("usuarios desconectado");
    });
  });
};

module.exports = eventosSocket;
