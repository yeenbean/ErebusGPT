import { CommandInteraction, SlashCommandBuilder } from "npm:discord.js@^14.12.1";
import { ErebusDoThingy } from "./ai.ts";

export const Ping = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Is erb alive?"),
    async execute(interaction: CommandInteraction) {
        await interaction.reply(await ErebusDoThingy.getResponse("/ping"));
    },
};

export const publishedCommands = [Ping.data.toJSON()];
