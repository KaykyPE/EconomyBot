const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "daily",
    description: "💰 | Pega seu premio diario",
    type: "CHAT_INPUT",
    options: [],

    run: async (client, interaction, args) => {
        let user = interaction.user;
        let cooldown = 86400000;

        let coins = db.get(`coins_${interaction.user.id}`)

        let lastDaily = await db.get(`cooldownDaily_${interaction.user.id}`);

        if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
            let timeObj = ms(cooldown - (Date.now() - lastDaily));
            interaction.reply(`⏰ | Você precisa esperar mais **${timeObj}** para pegar seu daily novamente.`)
        } else {

            let min = Math.ceil(600)
            let max = Math.ceil(1500)
            let rand = Math.floor(Math.random() * (max - min)) + min;
            db.add(`coins_${interaction.user.id}`, parseInt(rand))
            bal = db.get(`coins_${interaction.user.id}`);
            let embedDaily = new Discord.MessageEmbed()
                .setTitle(":sun_with_face: **|** Daily...")
                .setDescription(`Você pegou seu daily e ganhou \`${rand}$\``)
                .addField(":moneybag: **|** Coins:", `${bal}$`)
                .setColor("RED")
            interaction.reply({ embeds: [embedDaily] })
            db.set(`cooldownDaily_${interaction.user.id}`, Date.now());
        }
    }
}