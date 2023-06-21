const Usuario = require("../../models/usuario");

async function checkUser() {
    await Usuario.sync();
    const usuario = await Usuario.findAll();

    if (usuario.length > 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = checkUser;