module.exports = {
	name: "changeprefix",
	description: "Changes the prefix for the current server",
	async execute(message, args, pool) {
		function setPrefix(input) {
			prefix = input;
		}
		let guildID = message.guild.id;
		let newPrefix = args[0];
		let alterPrefix = () => {
			pool.query(`UPDATE table_guildprefixes
          SET prefix = '${newPrefix}'
          WHERE id = ${guildID};`);
		};
		if (
			args[0] !== null &&
			args[0] !== undefined &&
			message.member.hasPermission("ADMINISTRATOR")
		) {
			newPrefix = args[0];
			alterPrefix(newPrefix, guildID);
			//change prefix definition here
			setPrefix(newPrefix);
			message.channel.send("Prefix changed to: " + newPrefix);
		} else {
			message.reply("No new prefix provided or you are not an admin!");
		}
	}
};
