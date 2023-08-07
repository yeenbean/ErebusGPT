import openai = require("openai");
import * as Constants from "./constants.ts";
import * as config from "./config.ts";

// create openaiConfig
const openaiConfig = new openai.Configuration({
    apiKey: config.openaiToken,
});
const ai = new openai.OpenAIApi(openaiConfig);

export const ErebusDoThingy = {
    /**
     * @param userMessage the text to throw at the chatbot
     * @returns this tells you what happened after moderation: 0 means the message was fine, 1 means it got flagged, and -1 means there was a processing error.
     */
    performModeration: async (userMessage: string): Promise<number> => {
        // Check moderation
        const result = await ai.createModeration({
            input: userMessage,
        });

        // Discard empty response
        if (!result) return -1;

        // Interpret response
        if (result.data.results[0].flagged) {
            return 1;
        } else {
            return 0;
        }
    },

    /**
     * @param userMessage the text to throw at the chatbot.
     * @returns the chatbots message, created by yours truly 😏
     */
    getResponse: async (userMessage: string): Promise<string> => {
        const result = await ai
            .createChatCompletion({
                model: "gpt-3.5-turbo-0613",
                max_tokens: 256,
                messages: [
                    {
                        role: "system",
                        content: Constants.systemMessage,
                    },
                    {
                        role: "user",
                        content: userMessage,
                    },
                ],
            })
            .catch((error) => {
                console.log(`ERROR: OpenAI: ${error}`);
                //return 'oops, didnt get that, mind giving it another go? (error)'; // for some reason this line confuses ts.
            });

        // typescript...
        if (!result) {
            return "oops, didnt get that, mind giving it another go? (error -1)";
        }
        if (!result.data.choices[0].message) {
            return "oops my bad i didnt get that. mind giving it another shot? (error -2) 😅";
        }

        // set the response to a simple string (its easier trust me)
        let response = result.data.choices[0].message.content; // bffr
        if (!response) {
            return "oops my bad i didnt get that. mind giving it another shot? (error -3) 😅";
        }

        // process response
        response = response.toLowerCase(); // lowercase
        response = response.replaceAll(/[']/g, ""); // punctuation

        // send it!
        return response;
    },
};
