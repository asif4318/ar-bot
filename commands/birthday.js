let graduationCountdown = (bDay) => {
  const now = new Date();
  const gradDate = new Date(`${bDay}/${now.getFullYear()}`);
  let distance = gradDate.getTime() - now.getTime();
  console.log(distance);
  if (distance < 0) {
    const gradeDate = new Date(`${bDay}/${(now.getFullYear() + 1)}`);
  }
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  let reply = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  return reply;
};

module.exports = {
  name: 'birthday',
  description: 'Provides birthdays for members in the LunchTime Server',
  execute(message, args) {
    console.log(args);
    if (!args.length) {
      message.channel.send("Error: no person provided");
    } else if (args[0] === "asif") {
      message.channel.send(graduationCountdown("06/25"));
    } else if (args[0] === "kenna") {
      message.channel.send(graduationCountdown("05/08"))
    } else if (args[0] === "basia") {
      message.channel.send(graduationCountdown("02/27"))
    } else if (args[0] === "rachel") {
      message.channel.send(graduationCountdown("01/30"))
    } else if (args[0] === "nick") {
      message.channel.send(graduationCountdown("02/28"))
    } else if (args[0] === "katie") {
      message.channel.send(graduationCountdown("04/28"))
    } else if (args[0] === "cyrus") {
      message.channel.send(graduationCountdown("07/28"))
    } else if (args[0] === "adam") {
      message.channel.send(graduationCountdown("11/28"))
    } else if (args[0] === "tyler") {
      message.channel.send(graduationCountdown("07/29"))
    } else if (args[0] === "aidan") {
      message.channel.send(graduationCountdown("02/06"))
    } else if (args[0] === "zurii") {
      message.channel.send(graduationCountdown("09/09"))
    } else if (args[0] === "zurii") {
      message.channel.send(graduationCountdown("09/09"))
    } else if (args[0] === "raymond") {
      message.channel.send(graduationCountdown("05/23"))
    }
  },
};
