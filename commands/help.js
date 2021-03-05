const Discord = require('discord.js');

module.exports = {
  name: "help",
  description: "Help!",
  execute(message) {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**Help**")
      .setAuthor("IB Bot")
      .setDescription("A bot originally designed for IB students.")
      .addFields(
        {
          name: "$ar",
          value: "Generates the current day's AR period",
        },
        {
          name: "$graduation",
          value:
            "Generates time until PHU's senior graduation (On Jun 1st, 2021)",
        },
        {
          name: "$insult {@user}",
          value:
            "Generates insult with the ability to be directed at a specified user",
        },
        {
          name: "$insult2 {@user}",
          value:
            "Generates more extreme insult with the ability to be directed at a specified user",
        },
        {
          name: "$yomama {@user}",
          value: "Generates yo mama joke",
        },
        {
          name: "$dadjoke",
          value: "Generates a dad joke",
        },
        {
          name: "$meme",
          value: "Fetches a meme",
        },
        {
          name: "$cat",
          value: "Fetches a cat image",
        },
        {
          name: "$dog",
          value: "Fetches a dog image",
        },
        {
          name: "$nasa",
          value: "Fetches a NASA's astronomy picture of the day",
        },
        {
          name: "$pokemon {name of pokemon}",
          value:
            "Fetches the pokemon's sprite from given name {example: `$pokemon ditto`}",
        }
      )
      .setTimestamp()
      .setFooter("Bot Made by Asif");

    message.channel.send(embed);
  },
};
