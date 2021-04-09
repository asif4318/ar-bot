const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const { ar } = require("./fetchAR.js");
const cron = require("cron");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
  const fetchGuilds = () => client.guilds.cache.map((g) => g); //Obtains array of all guilds (servers)
  // Fetches list of all system Channels
  const fetchSystemChannels = () => {
    systemChannels = [];
    for (i = 0; i < fetchGuilds().length; i++) {
      if (fetchGuilds()[i].systemChannelID !== null) {
        systemChannels.push(fetchGuilds()[i].systemChannelID);
      } else if (fetchGuilds()[i].name === 'general') {
		systemChannels.push(fetchGuilds()[i].systemChannelID);
	  }
    }
    return systemChannels;
  };
  console.log(fetchSystemChannels());
  //Messages all systemChannels
  /*for (i = 0; i < systemChannels.length; i++) {
    client.channels.cache
      .get(systemChannels[i])
      .send(
        "If you are interested in receiving automatic AR reminders at 9:00am on weekdays, please create a #ar-bot channel!"
      );
  }*/

  // Finds all channels with name 'ar-bot' and get ID
  const fetchArBotChannels = () => {
    const allChannels = () => client.channels.cache.map((c) => c);
    let arBotChannels = [];
    for (i = 0; i < allChannels().length; i++) {
      if (allChannels()[i].name === "ar-bot") {
        arBotChannels.push(allChannels()[i].id);
      }
    }
    return arBotChannels;
  };

  //Schedule cron job
  let arJob = new cron.CronJob(
    "0 0 9 * * 1-5",
    function () {
      for (i = 0; i < fetchArBotChannels().length; i++) {
        try {
          client.channels.cache.get(fetchArBotChannels()[i]).send(ar()[0]);
          client.channels.cache.get(fetchArBotChannels()[i]).send(ar()[1]);
        } catch (err) {
          console.log("Error");
        }
      }
    },
    null,
    true,
    "America/New_York"
  );
  arJob.start();
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error trying to execute that command!");
  }
});

client.login(token);
