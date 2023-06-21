const Usuario = require("../../models/usuario");

async function checkUser() {
    await Usuario.sync();
    const usuario = await Usuario.findAll();

    if (usuario.length > 0) {
        console.log('Existe usuário cadastrado no banco');
        return true;
    } else {
        console.log('Não existe usuário cadastrado no banco');
        return false;
    }
}

module.exports = checkUser;