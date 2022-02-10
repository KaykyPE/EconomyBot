const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("pretty-ms")

module.exports = {
    name: "daily",
    aliases: ["diario"],

    run: async (client, message, args) => {

        let user = message.author;
        let cooldown = 86400000;

        let coins = db.get(`coins_${message.author.id}`)

        let lastDaily = await db.get(`cooldownDaily_${message.author.id}`);

        if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
            let timeObj = ms(cooldown - (Date.now() - lastDaily));
            message.reply(`⏰ | Você precisa esperar mais **${timeObj}** para pegar seu daily novamente.`)
        } else {

            let min = Math.ceil(600)
            let max = Math.ceil(1500)
            let rand = Math.floor(Math.random() * (max - min)) + min;
            db.add(`coins_${message.author.id}`, parseInt(rand))
            bal = db.get(`coins_${message.author.id}`);
            let embedDaily = new Discord.MessageEmbed()
                .setTitle(":sun_with_face: **|** Daily...")
                .setDescription(`Você pegou seu daily e ganhou \`${rand}$\``)
                .addField(":moneybag: **|** Coins:", `${bal}$`)
                .setColor("RED")
            message.reply({ embeds: [embedDaily] })
            db.set(`cooldownDaily_${message.author.id}`, Date.now());
        }
    }
}