let birthdayCountdown = (bDay) => {
  const now = new Date();
  let case1 = new Date(`${bDay}/${now.getFullYear()}`);
  let dateOfNextBday = new Date(`${bDay}/${now.getFullYear()}`);
  if (case1.getTime() - now.getTime() < 0) {
    dateOfNextBday = new Date(`${bDay}/${now.getFullYear() + 1}`);
  }
  let distance = dateOfNextBday.getTime() - now.getTime();
  console.log(distance);
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  let reply = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  return reply;
};

let birthdayDates = {
  raymond: "05/23",
  asif: "06/25",
  ishi: "03/20",
  katie: "04/28",
  zurii: "09/09",
  adam: "11/28",
  basia: "02/27",
  kenna: "05/08",
  aidan: "02/06",
  ted: "06/11",
  tyler: "07/29",
  rachel: "01/30",
  cyrus: "07/28",
  nick: "02/28",
};

module.exports = {
  name: "birthday",
  description: "Provides birthdays for members in the LunchTime Server",
  execute(message, args) {
     let now = new Date(); 
    if (args[0] in birthdayDates) {
        message.channel.send(birthdayCountdown(birthdayDates[args[0]]))
        console.log("Executed $birthday" + " " + now.toLocaleDateString() + " " + now.toLocaleTimeString());
    } else if (!(args[0] in birthdayDates)) {
        console.log("Error" + " " + now.toLocaleDateString() + " " + now.toLocaleTimeString());
        message.channel.send("Error: no person provided or person is not recognized.")
    }
  },
};
