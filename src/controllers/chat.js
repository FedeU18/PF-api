const {
    Chat
} = require("../db.js");
const guardarchat = async (data) => {
    try {
        let NewProfesor = await Chat.create({
            room: data.room,
            remitente: data.remitente,
            receptor: data.receptor,
            mensaje: data.mensaje,
            time: data.time,
        });
        return "chat insertado correctamente";
    } catch (e) {
        console.log(e);
    }
}
const mensajesAntiguos = async (userLogin, receptor) => {
    console.log(`soy userLogin ${userLogin} y yo receptor ${receptor}`)
    let chatOld = await Chat.findAll()
    let arreglo = []
    chatOld.forEach(e => {
        arreglo.push(e.dataValues)
    })
    const mensajesAlumno = arreglo.filter(
        (e) => (e.remitente === userLogin && e.receptor === receptor) || (e.remitente === receptor && e.receptor === userLogin));
    return mensajesAlumno
}
const usuariosChat = async (userLogin) => {
    let usuarios = await Chat.findAll()
    let arrayUsers = []
    usuarios.forEach(e => {
        arrayUsers.push(e.dataValues)
    })
    let usuariosProfe = []
    arrayUsers.forEach(e => {
        if (e.remitente === userLogin && !usuariosProfe.includes(e.receptor)) {
            usuariosProfe.push(e.receptor)
        }
        if (e.receptor === userLogin && !usuariosProfe.includes(e.remitente)) {
            usuariosProfe.push(e.remitente)
        }
    })
    return usuariosProfe
}
module.exports = {
    guardarchat,
    mensajesAntiguos,
    usuariosChat
}