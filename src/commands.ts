import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ErebusDoThingy } from "./ai.ts";
import { makeReport } from "./weather.ts";

export const Ping = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping me to check if im awake and ready to chat!"),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        await interaction.editReply(await ErebusDoThingy.getResponse("/ping"));
    },
};

export const WeatherCity = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("check out the weather in any city, fam.")
        .addStringOption((option) =>
            option.setName("city")
                .setDescription("the city you wanna get the weather from")
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        // defer reply in case either OpenAI or OpenWeatherMap APIs are slow
        await interaction.deferReply();

        // validation
        // TODO: intellisense is not intellisensing 🤦
        const city = await interaction.options.getString("city") ?? null;
        if (!city) {
            await interaction.editReply(
                await ErebusDoThingy.getResponse(
                    `Rewrite the following in your own style: There was an error executing this command.`,
                ),
            );
        } else {
            const report = await makeReport(city);
            await interaction.editReply(
                await ErebusDoThingy.getResponse(
                    `Create a weather report in your own style using the data below:\n\n${report}`,
                ),
            );
        }
    },
};

export const publishedCommands = [
    Ping.data.toJSON(),
    WeatherCity.data.toJSON(),
];
