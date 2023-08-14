import discord from "discord.js";
import * as config from "./config.ts";
import * as loggy from "https://deno.land/x/loggy@0.0.2/main.ts";

// Construct and prepare an instance of the REST module
const rest = new discord.REST().setToken(config.discordToken);

// define commands
import { publishedCommands } from "./commands.ts";
console.log(publishedCommands);

// and deploy your commands!
await (async () => {
    try {
        loggy.log(
            `Started refreshing ${publishedCommands.length} application (/) commands.`,
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data: any = await rest.put(
            discord.Routes.applicationCommands(config.discordClientId),
            { body: publishedCommands },
        );

        loggy.up(
            `Successfully reloaded ${data.length} application (/) commands.`,
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        loggy.critical(error);
    }
})();
