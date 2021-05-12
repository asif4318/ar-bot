const fs = require('fs'); // Reads filesystem to see config.json
const Discord = require('discord.js'); //Discord API wrapper
const { prefix, token } = require('./config.json'); //Import the prefix (ex: *, !, $) from the config file
// and token required to authorize the bot
const { arFunction } = require('./fetchAR.js'); //AR command to execute on cron job
const cron = require('cron'); //Timing library to send AR message at specified time every weekday.

//Initializing Disocrd Client
const client = new Discord.Client();
//Creating a collection, similar to an object, to hold all commands (Ex: $help, $ar, $inspire)
client.commands = new Discord.Collection();

//Read all files in directy commands that end with a .js extension
const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

//Adds commands to collection
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Commands to be performed when the bot is initialized
client.once('ready', () => {
    console.log('Ready!');

    //Sets listening to help status on Discord
    client.user.setActivity(`Listening to ${prefix}help`);

    const fetchGuilds = () => client.guilds.cache.map((g) => g); //Obtains array of all guilds (servers)
    const fetchGuildsName = () => client.guilds.cache.map((g) => g.name);

    // Fetches list of all System Channels
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
    //Messages all systemChannels
    /*for (i = 0; i < systemChannels.length; i++) {
    client.channels.cache
      .get(systemChannels[i])
      .send(
        "If you are interested in receiving automatic AR reminders at 9:00am on weekdays, please create a #ar-bot channel!"
      );
  }*/

    // Finds all channels with name 'ar-bot' and map IDs into an array
    const fetchArBotChannels = () => {
        const allChannels = () => client.channels.cache.map((c) => c);
        let arBotChannels = [];
        for (i = 0; i < allChannels().length; i++) {
            if (allChannels()[i].name === 'ar-bot') {
                arBotChannels.push(allChannels()[i]);
            }
        }
        return arBotChannels;
    };

    /*function testARChannels() {
    for (const value of fetchArBotChannels()) {
      try {
        value.send(ar()[0]);
        value.send(ar()[1]);
        console.log('Sent AR message');
      } catch (err) {
        console.log(err);
      }
    }
  }

  testARChannels();*/

    //Schedule cron job to send an AR messsage at 9:00am every weekday
    let morningCronTime = "0 0 9 * * 1-5"
    let nightCronTime = "0 0 21 * * 1-5"

    let arJob = new cron.CronJob(
        nightCronTime,
        function () {
            for (const channel of fetchArBotChannels()) {
                try {
                    channel.send(arFunction(true)[0]);
                    channel.send(arFunction(true)[1]);
                    console.log('Sent AR message');
                } catch (err) {
                    console.log(err);
                }
            }
        },
        null,
        true,
        'America/New_York'
    );
    arJob.start();
});

//Commands to be performed when a message is sent
client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //Defines arguments as content right after the prefix, splitting at spaces
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    //Shifts all arguments to lower case such that bot commands are not case sensitive
    const command = args.shift().toLowerCase();

    //Checks if the command provided is part of the command collections and returns if false.
    if (!client.commands.has(command)) return;
    //Else if the command exists within the collection - execute
    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.login(token);
