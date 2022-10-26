# AR Bot
## A Discord Bot originally intended for the discord server LunchTime Server Edition to notify participants of their academic rotation (AR) period.
The academic rotation is a 9 day rotating period that is part of the schedule of Palm Harbor University High School's International Baccalaureate Program. This Discord bot is capable of calculating the given academic rotation period for a given day and sending reminders about the AR period using a cron schedule. 
Functionality of this bot was later expanded to include a variety of fun commands such as telling jokes, sending birthday reminders, and delivering memes via consumption of various REST APIs from different services.
Written in NodeJS using the DiscordJS library

## Setup
Clone this project and navigate into the project directory. Then create a config.json based on config.json.example. 
Set the prefix. The prefix determines which prefix the bot will respond to. For example if the prefix is '*', then '*ar' will trigger the ar command.
Next, insert your discord bot token. 
Insert the start and end dates of the semester in the form of "Month day, YYYY". 
Next insert any semester holidays in the for of MM_DD_YY in an array.
Run the bot by running 'node app.js'

