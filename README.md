# AR Bot
## A Discord Bot originally intended for the discord server LunchTime Server Edition to notify participants of their academic rotation (AR) period.
Functionality of this bot was later expanded to include a variety of fun commands such as telling jokes, birthday reminders, and sending memes.
Written in NodeJS using the DiscordJS library

## Setup
Clone this project and navigate into the project directory. Then create a config.json based on config.json.example. 
Set the prefix. The prefix determines which prefix the bot will respond to. For example if the prefix is '*', then '*ar' will trigger the ar command.
Next, insert your discord bot token. 
Insert the start and end dates of the semester in the form of "Month day, YYYY". 
Next insert any semester holidays in the for of MM_DD_YY in an array.
Run the bot by running 'node app.js'

