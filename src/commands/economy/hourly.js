const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("pretty-ms")

module.exports = {
    name: "hourly",
    aliases: ["horario"],

    run: async (client, message, args) => {
        let user = message.author;
        let cooldown = 3600000;

        let coins = db.get(`coins_${message.author.id}`)

        let lastHourly = await db.get(`cooldownHourly_${message.author.id}`);

        if (lastHourly !== null && cooldown - (Date.now() - lastHourly) > 0) {
            let timeObj = ms(cooldown - (Date.now() - lastHourly));
            message.reply(`⏰ | Você precisa esperar mais **${timeObj}** para pegar seu hourly novamente.`)
        } else {

            let min = Math.ceil(200)
            let max = Math.ceil(400)
            let rand = Math.floor(Math.random() * (max - min)) + min;
            db.add(`coins_${message.author.id}`, parseInt(rand))
            bal = db.get(`coins_${message.author.id}`);
            let embedHourly = new Discord.MessageEmbed()
                .setTitle("⏰ **|** Hourly...")
                .setDescription(`Você pegou seu daily e ganhou \`${rand}$\``)
                .addField(":moneybag: **|** Coins:", `${bal}$`)
                .setColor("RED")
            message.reply({ embeds: [embedHourly] })
            db.set(`cooldownHourly_${message.author.id}`, Date.now());
        }
    }
}