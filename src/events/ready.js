const colors = require("colors")

module.exports = async Client => {
    console.log('Pronto, fui iniciado com '.blue + `${Client.users.cache.size}`.red + ' usuários, em '.blue + `${Client.channels.cache.size}`.red + ' canais de '.blue + `${Client.guilds.cache.size}`.red + ' servidores.'.blue);
}