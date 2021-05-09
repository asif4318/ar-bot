const fs = require("fs");
const { token, poolinfo } = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const Pool = require("pg").Pool;
const pool = new Pool(poolinfo);

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


//console.log(commandNameDescription);
commandNameDescription = Array.from(client.commands.values());


let guildArray;
function setGuildArray() {
  pool.query("select * from table_guildprefixes", function (err, results) {
    if (err) {
      throw err;
    } else {
      setValue(results.rows);
    }
  });
}
function setValue(value) {
  guildArray = value;
}

client.once("ready", () => {
  console.log("Ready!");
  //console.log(client.commands);
  setGuildArray();
});

let findGuildPrefix = (guildId) => {
  let guildID = guildId;
  setGuildArray();
  let guildInArray = guildArray.find((e) => e.id === guildID);
  console.log(guildInArray);
  if (guildInArray === null || guildInArray === undefined) {
    pool.query(
      `INSERT INTO table_guildprefixes (id, prefix) VALUES (${guildID}, '$')`
    );
    guildInArray = { id: guildID, prefix: "$" };
  }
  return guildInArray.prefix;
};

client.on("message", async (message) => {
  let guildID = message.guild.id;
  let prefix = findGuildPrefix(guildID);
  
  console.log(prefix);

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //Defines arguments as content right after the prefix, splitting at spaces
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  //Shifts all arguments to lower case such that bot commands are not case sensitive
  const command = args.shift().toLowerCase();

  //Checks if the command provided is part of the command collections and returns if false.
  if (!client.commands.has(command)) return;
  //Else if the command exists within the collection - execute
  try {
    // pool = psql pool, prefix = current guild prefix
    client.commands.get(command).execute(message, args, pool, prefix);
  } catch (error) {
    console.error(error);
    message.reply("There was an error trying to execute that command!");
  }
});

client.login(token);
