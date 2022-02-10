const Discord = require("discord.js")
const db = require("quick.db")

module.exports =  {
    name: "hourly",
    description: "💰 | Pega seu premio horario",
    type: "CHAT_INPUT",    
    options: [],
    
    run: async (client, interaction, args) => {
        let user = interaction.user;
        let cooldown = 3600000;

        let coins = db.get(`coins_${interaction.user.id}`)

        let lastHourly = await db.get(`cooldownHourly_${interaction.user.id}`);

        if (lastHourly !== null && cooldown - (Date.now() - lastHourly) > 0) {
            let timeObj = ms(cooldown - (Date.now() - lastHourly));
            interaction.reply(`⏰ | Você precisa esperar mais **${timeObj}** para pegar seu hourly novamente.`)
        } else {

            let min = Math.ceil(200)
            let max = Math.ceil(400)
            let rand = Math.floor(Math.random() * (max - min)) + min;
            db.add(`coins_${interaction.user.id}`, parseInt(rand))
            bal = db.get(`coins_${interaction.user.id}`);
            let embedHourly = new Discord.MessageEmbed()
                .setTitle("⏰ **|** Hourly...")
                .setDescription(`Você pegou seu daily e ganhou \`${rand}$\``)
                .addField(":moneybag: **|** Coins:", `${bal}$`)
                .setColor("RED")
            interaction.reply({ embeds: [embedHourly] })
            db.set(`cooldownHourly_${interaction.user.id}`, Date.now());
        }
    }
}