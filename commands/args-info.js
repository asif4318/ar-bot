module.exports = {
  name: 'args-info',
  description: 'Gives argument info',
  execute(message, args) {
    console.log(args);
    if (!args.length) {
      message.channel.send("Error: no arguments provided");
    } else {
			message.channel.send(args);
		}
  },
};
