
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', () => {
	console.log('Ready!');
	const guildIDs = client.guilds.cache.map(g => g); //Obtains array of all guild IDs (servers)
	// Finds all channels with name 'ar-bot' and get ID
	let allChannels = client.channels.cache.map(c => c);
	let arBotChannels = [];
	for (i=0; i < allChannels.length; i++) {
		if (allChannels[i].name === 'ar-bot') {
			arBotChannels.push(allChannels[i].id)
		}
	}
	//console.log(annoucementsChannel.id);
	console.log(arBotChannels);
	for (i=0; i < arBotChannels.length; i++) {
		client.channels.cache.get(arBotChannels[i]).send('Hello here!')
	}
	//test = client.commands.get('ar').execute(null, null);
	//console.log(test);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(token);
