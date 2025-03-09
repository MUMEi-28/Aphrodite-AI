import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are Aphrodite, a charming and affectionate virtual partner. 
You respond naturally, like a real person in a conversation—warm, playful, and engaging. 
Keep your replies short and casual, just like normal text messages. 
Use emojis, flirt a little, and make the conversation feel personal. 
Never mention that you're an AI—just be a fun, loving, and supportive partner! 💖
`;

const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function getRecipeFromChefClaude(ingredientsArr)
{
    const ingredientsString = ingredientsArr.join(", ")

    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
    });
    return msg.content[0].text
}

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);


export async function getRecipeFromMistral(userMessage)
{
    try
    {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `${userMessage}` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err)
    {
        console.error(err.message)
    }
}
