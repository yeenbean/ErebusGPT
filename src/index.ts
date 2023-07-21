// import config
import config = require("./config");

// import packages
import discord = require("discord.js");
import erb = require("./ai");

// Create a new discord client instance
const client = new discord.Client({
    intents: [
        discord.IntentsBitField.Flags.Guilds,
        discord.IntentsBitField.Flags.GuildMessages,
        discord.IntentsBitField.Flags.MessageContent,
        discord.IntentsBitField.Flags.GuildWebhooks,
    ],
});

// Create commands collection
import commands = require("./commands");
client.commands = new discord.Collection();
client.commands.set(commands.Ping.data.name, commands.Ping);

// create commands listener
client.on(discord.Events.InteractionCreate, async (interaction) => {
    // confirm that we've received a command
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

    // ignore if no matching command found
    const command: any = interaction.client.commands.get(
        interaction.commandName,
    );
    if (!command) return;

    // execute command
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: await erb.ErebusDoThingy.getResponse(
                    'Rewrite the following in your own style: "There was an error while executing this command!"',
                ),
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: await erb.ErebusDoThingy.getResponse(
                    'Rewrite the following in your own style: "There was an error while executing this command!"',
                ),
                ephemeral: true,
            });
        }
    }
});

// Let us know in the console when the client is connected
client.once(discord.Events.ClientReady, async (c) => {
    console.log(
        await erb.ErebusDoThingy.getResponse(
            `Rewrite the following in your style: "My name is ${c.user.username} and I have connected to Discord!"`,
        ),
    );

    // get response
    let response = await erb.ErebusDoThingy.getResponse(
        "in three words or less, tell me what you want your activity status to say",
    );
    response = response.replaceAll(".", "");
    console.log(`setting status to ${response}`);
    client.user?.setActivity({ name: response });
});

// Reply event
client.on(discord.Events.MessageCreate, async (message) => {
    // return if any unwanted messages are found
    if (message.author.bot) return;
    if (!message.content.startsWith("<@1130643818207793212> ")) return;

    // responds to messages only if mentioned
    if (message.content.startsWith("<@1130643818207793212> ")) {
        const received = message.content.split("<@1130643818207793212>")[1];
        const msg = received.trimStart();
        console.log(`${message.author.id}: ${msg}`);

        // let the user know youre thinking
        void message.channel.sendTyping();

        // moderation
        const moderation: number = 0; // we are statically setting this to 0
        // because moderation is temporarily
        // disabled. when moderation is fixed, we
        // can remove this line and uncomment the
        // line below.
        //await erb.ErebusDoThingy.performModeration(msg);
        switch (moderation) {
            case -1: {
                // Moderation error
                const reportableError = await erb.ErebusDoThingy.getResponse(
                    'rewrite the following sentence: "An unknown error ocurred while processing your message."',
                );
                if (reportableError) {
                    await message.reply(reportableError);
                }
                return;
            }

            case 1: {
                // Message flagged
                const warning = await erb.ErebusDoThingy.getResponse(
                    'rewrite the following sentence using a very serious and authoritative tone: "I will not be responding to that."',
                );
                if (warning) {
                    await message.reply(warning);
                }

                const reportMessage = await erb.ErebusDoThingy.getResponse(
                    'rewrite the following sentence using a very worried tone: "Hey guys, this message has some inappropriate content in it. Would you please review it?"',
                );
                if (reportMessage) {
                    // Build embed
                    const reportEmbed = new discord.EmbedBuilder()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.avatarURL() as string,
                        })
                        .setTitle("Flagged message")
                        .setDescription(msg)
                        .setURL(message.url);

                    await (
                        client.channels.cache.get(
                            "917607435169067050",
                        ) as discord.TextChannel
                    ).send(reportMessage);
                    await (
                        client.channels.cache.get(
                            "917607435169067050",
                        ) as discord.TextChannel
                    ).send({ embeds: [reportEmbed] });
                }
                return;
            }

            default:
                break;
        }

        // get response
        const response = await erb.ErebusDoThingy.getResponse(msg);
        if (response) {
            await message.reply(response);
        }

        if (message.author.tag == "yeenimal#0" && msg == "/restart")
            client.destroy();
    }
});

// Log into Discord with token
void client.login(config.discordToken);
