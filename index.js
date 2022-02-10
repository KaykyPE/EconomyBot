/*

- ✨ Feito por: KaykyPE#1998

- 🎭 Caso precise de algo chame KaykyPE#1998 no discord ou kaykype5050@gmail.com no email

- 💎 Como usar
  ┕ Coloque o token do seu bot em "config.js" (Caso não saiba fazer isso pesquise no youtube, dificil)
    Configure o prefix usando -prefix no discord

- 🍻 Eu também vendo scripts para bot, plugins, skripts de minecraft e muito mais, basta chamar em KaykyPE#1998 no discord ou kaykype5050@gmail.com no email

- 🥂 Licença
  ┕ Você pode editar o bot para uso pessoal, e estuda-lo como quiser, mas não o venda ou saia por ai falando que é seu

- 🛠 Database: quick.db (sqlite)

- Use a aba issues para qualquer sugestão ou duvida


APROVEITE! :)

*/

//Dependencias
const Discord = require("discord.js")
const config = require("./config")
const enmap = require("enmap")
const fs = require("fs")
const colors = require("colors")
const { Client, Intents, Permissions, Collection } = require("discord.js");
const client = new Discord.Client({ intents: [32767, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const db = require("quick.db")

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./src/commands/`);

module.exports = client;
client.slashCommands = new Discord.Collection();
client.config = require("./config");
require("./src/handler")(client);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

//Lendo a pasta dos eventos
fs.readdir("./src/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./src/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

//Lendo a pasta dos comandos
fs.readdirSync('./src/commands/').forEach(local => {
    const comandos = fs.readdirSync(`./src/commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for (let file of comandos) {
        let puxar = require(`./src/commands/${local}/${file}`)

        if (puxar.name) {
            client.commands.set(puxar.name, puxar)
        }
        if (puxar.aliases && Array.isArray(puxar.aliases))
            puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
        console.log(`O comando `.green + `${puxar.name}`.red + ` foi carregado`.green)
    }
});


//Ligando o bot
if(config.token == '' || config.token == null || config.token == undefined) config.token = 'Nothing'
client.login(config.token).catch((err) =>{ console.log(`[err] ~Ocorreu algum erro, Aqui vão algumas solucões...\n\n`.red+`- O token`.yellow + ` ${config.token}`.green + ` pode estar errado\n`.yellow+`- Você não ativou as intents no site do discord\n`.yellow+`- Você não definiu um token na config.js`.yellow) })