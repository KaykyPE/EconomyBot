const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "pay",
    aliases: ["pagar", "doar", "payment"],

    run: async(client, message, args) => {
        let coins = db.get(`coins_${message.author.id}`)
        let quantia = parseInt(args[0])
        let prefix = db.get(`prefix_${message.guild.id}`)
        let user = message.mentions.users.first() || client.users.cache.find(a => a.id === args[1]) || client.users.cache.find(user => user.username === args[1])

        if(!quantia && args[0] != "all" && args[0] != "tudo" || !user) return message.reply(`:x: **|** uso: ${prefix}pay <quantia | all> <usuario>`)

        if(user.id == message.author.id) return message.reply(`:x: **|** Você não pode doar dinheiro para si mesmo`)

        if(args[0] == "tudo" || args[0] == "all"){
            if(coins <= 0) return message.reply(`:x: **|** Você não tem nenhum dinheiro`)

            quantia = coins;
        }else{
            if(args[0].endsWith(`${quantia}k`)){
                quantia = quantia * 1000
            }
        }
        console.log(quantia)
        if(quantia > coins) return message.reply(`:x: **|** Você não tem dinheiro suficiente para isto.`)
        message.reply(`:white_check_mark: **|** Você doou \`${quantia} coins\` para ${user}`)
        db.add(`coins_${user.id}`, parseInt(quantia))
        db.subtract(`coins_${message.author.id}`, parseInt(quantia))
    }
}