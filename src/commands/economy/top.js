const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "top",
    aliases: ["baltop", 'lb', 'leaderboard'],

    run: async(client, message, args) => {
        let splita = args.join(" ").split(" ")
        let subc = splita[0]
        let coins = db.all().filter(data => data.ID.startsWith(`coins_`)).sort((a, b) => b.data - a.data);
        let bank1;
        
        if(coins.length > 10){
            bank1 = 10
        }else{
            bank1 = coins.length
        
        }
        let content = "";
        for (let i = 0; i < bank1; i++) {
            let member = client.users.cache.get(coins[i].ID.split('_')[1])
            if(member != undefined) member  = client.users.cache.get(coins[i].ID.split('_')[1]).username
            if(member == undefined) member = "Não Encontrado"
            content += `${i+1}º \`${member}\` - **$${coins[i].data}**\n`
        }

        const embed = new Discord.MessageEmbed()
        .setTitle(`:moneybag: **|** Rank de Coins`)
        .setDescription(content)
        .setColor('RED')
        .setTimestamp();

        message.reply({embeds:[embed]});
    }
}