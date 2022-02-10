const db = require("quick.db");
const Discord = require("discord.js")
const config = require("../../config")

module.exports = async (client, message) => {
    try {
        db.get(`prefix_${message.guild.id}`)
    } catch {
        return
    }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (!message.guild.me.permissionsIn(message.channel.id).has("SEND_MESSAGES") && message.channel.type != 'dm' && message.content.startsWith(prefix) || !message.guild.me.permissionsIn(message.channel.id).has("SEND_MESSAGES") && message.channel.type != 'dm' && message.content == `<@!886110360132780053>` || !message.guild.me.permissionsIn(message.channel.id).has("SEND_MESSAGES") && message.channel.type != 'dm' && message.content == `<@886110360132780053>`) {
        message.author.send("<a:negado:919301861742358549> **|** Eu não tenho permissões para enviar mensagens em " + message.guild.name + ", desculpe");
        return
    }

    if (prefix === null) {
        db.set(`prefix_${message.guild.id}`, "-");
        prefix = await db.get(`prefix_${message.guild.id}`)
    }

    if (message.content == `<@!${client.user.id}>` && !message.author.bot || message.content == `<@${client.user.id}>` && !message.author.bot) {
        message.reply(`:pencil: **|** Ola, eu sou o \`${config.bot_options.bot_name ? config.bot_options.bot_name : 'EconomyBot'}\` caso precise de ajuda digite ${prefix}help`)
    }

    if (message.author.bot) return;

    if (message.channel.type == 'dm') return;

    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))

    try {
        command.run(client, message, args)
    } catch (err) {
        message.reply(`:x: **|** Este comando não existe`)
        console.log(err)
    }
}