module.exports = {
	name: "help",
	description: "Changes the prefix for the current server",
	async execute(message, args) {
		let info = [];
		for (i = 0; i < commandNameDescription.length; i++) {
			info[i] = {
				name: commandNameDescription[i].name,
				description: commandNameDescription[i].description
			};
		}
		for (i = 0; i < info.length; i++) {
			message.channel.send(info[i].name + " : " + info[i].description);
		}
	}
};
