const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "money",
    aliases: ["bal", "balance", "saldo", "dinheiro", "coins", "atm"],

    run: async(client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
        let usuario = message.mentions.members.first() || client.users.cache.find(a => a.id === args[0]) || client.users.cache.find(user => user.username === args[0])
        let msg
        let coins = usuario ? db.get(`coins_${usuario.id}`) : db.get(`coins_${message.author.id}`)

        if(coins == null){
            if(usuario){ db.set(`coins_${usuario.id}`, 0) } else { db.set(`coins_${message.author.id}`, 0) }

            coins = usuario ? db.get(`coins_${usuario.id}`) : db.get(`coins_${message.author.id}`)
        }
        
        if(!usuario){
            usuario = message.author
            msg = `:moneybag: **|** Você tem \`${coins} coins\`, caso precise de mais digite \`${prefix}daily\` para pegar`
        }else{
            msg = `:moneybag: **|** ${usuario} tem \`${coins} coins\``
        }

        message.reply(`${msg}`)
    }
}