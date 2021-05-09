module.exports = {
  name: "purge",
  description: "Deletes messages en masse",
  async execute(message, args) {
    let amount = args[0];
    message.channel.messages
      .fetch({
        limit: amount,
      })
      .then((messages) => {
        message.channel.bulkDelete(messages);
      });
  },
};
