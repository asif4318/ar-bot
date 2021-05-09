module.exports = {
	name: "purge",
	description: "Deletes messages en masse",
	async execute(message, args) {
		let amount = args[0];
		if (
			message.member.hasPermission("ADMINISTRATOR") &&
			args[0] !== undefined
		) {
			message.channel.messages
				.fetch({
					limit: amount
				})
				.then((messages) => {
					message.channel.bulkDelete(messages);
				});
			message.channel.send(`${amount} messages were purged!`);
		} else {
			message.channel.send(
				"You do not have the right permission or did not specify the number of messages to delete!"
			);
		}
	}
};
