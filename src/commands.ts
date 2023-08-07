import { CommandInteraction, SlashCommandBuilder } from "discord.js";
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
