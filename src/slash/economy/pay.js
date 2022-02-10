const Discord = require("discord.js")
const db = require("quick.db")

module.exports =  {
    name: "pay",
    description: "💰 | Pague usuarios",
    type: "CHAT_INPUT",    
    options: [
        {
            name: "usuario",
            type: "USER",
            description: "💰 | Defina o usuario que irá receber o dinheiro",
            required: true
            
        }
    ],
    
    run: async (client, interaction, args) => {
        let coins = db.get(`coins_${interaction.user.id}`)
        let quantia = parseInt(args[0])
        let prefix = db.get(`prefix_${interaction.guild.id}`)
        let user = interaction.options.getUser("usuario");

        if(!quantia && args[0] != "all" && args[0] != "tudo" || !user) return interaction.reply(`:x: **|** uso: ${prefix}pay <quantia | all> <usuario>`)

        if(user.id == interaction.user.id) return interaction.reply(`:x: **|** Você não pode doar dinheiro para si mesmo`)

        if(args[0] == "tudo" || args[0] == "all"){
            if(coins <= 0) return interaction.reply(`:x: **|** Você não tem nenhum dinheiro`)

            quantia = coins;
        }else{
            if(args[0].endsWith(`${quantia}k`)){
                quantia = quantia * 1000
            }
        }
        console.log(quantia)
        if(quantia > coins) return interaction.reply(`:x: **|** Você não tem dinheiro suficiente para isto.`)
        interaction.reply(`:white_check_mark: **|** Você doou \`${quantia} coins\` para ${user}`)
        db.add(`coins_${user.id}`, parseInt(quantia))
        db.subtract(`coins_${interaction.user.id}`, parseInt(quantia))
    }
}