module.exports = {
  name: "graduation",
  description: "Fetches date until senior graduation",
  execute(message) {
    let graduationCountdown = () => {
      const gradDate = new Date("06/01/2021");
      const now = new Date();

      let distance = gradDate.getTime() - now.getTime();

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let reply = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      return reply;
    };

    message.channel.send(
      "Time left until senior graduation: " + graduationCountdown()
    );
  },
};
