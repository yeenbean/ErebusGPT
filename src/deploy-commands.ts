import discord = require("discord.js");
import config = require("./config");

// Construct and prepare an instance of the REST module
const rest = new discord.REST().setToken(config.discordToken);

// define commands
import { publishedCommands } from "./commands";
console.log(publishedCommands);

// and deploy your commands!
await (async () => {
  try {
    console.log(
      `Started refreshing ${publishedCommands.length} application (/) commands.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      discord.Routes.applicationCommands(config.discordClientId),
      { body: publishedCommands },
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
