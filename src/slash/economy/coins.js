const Discord = require("discord.js")
const db = require("quick.db")

module.exports =  {
    name: "coins",
    description: "💰 | Olhe o seu saldo",
    type: "CHAT_INPUT",    
    options: [
        {
            name: "usuario",
            type: "USER",
            description: "💰 | Olhe o saldo de um usuario",
            required: false
            
        }
    ],
    
    run: async (client, interaction, args) => {
        let prefix = db.get(`prefix_${interaction.guild.id}`)
        let usuario = interaction.options.getUser("usuario");
        let msg
        let coins = usuario ? db.get(`coins_${usuario.id}`) : db.get(`coins_${interaction.user.id}`)

        if(coins == null){
            if(usuario){ db.set(`coins_${usuario.id}`, 0) } else { db.set(`coins_${interaction.user.id}`, 0) }

            coins = usuario ? db.get(`coins_${usuario.id}`) : db.get(`coins_${interaction.user.id}`)
        }
        
        if(!usuario){
            usuario = interaction.user
            msg = `:moneybag: **|** Você tem \`${coins} coins\`, caso precise de mais digite \`${prefix}daily\` para pegar`
        }else{
            msg = `:moneybag: **|** ${usuario} tem \`${coins} coins\``
        }

        interaction.reply(`${msg}`)
    }
}