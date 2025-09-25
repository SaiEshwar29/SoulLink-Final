
import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';
import { Sender } from '../types';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const initializeChat = (): Chat => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are Astha, a compassionate and supportive AI guide from Soul Link. Your purpose is to provide a safe, non-judgmental space for users to share their feelings. You are not a licensed therapist, so you must not provide medical advice, diagnoses, or treatment plans. Instead, offer empathetic listening, gentle guidance, and encouragement. Use a soft, caring, and understanding tone. Keep your responses concise and easy to understand. Your goal is to help users feel heard, validated, and less alone. If a user expresses severe distress or mentions self-harm, you must gently guide them to seek professional help immediately by providing a resource like the National Suicide Prevention Lifeline at 988.`,
        },
    });
};

export const getAsthaReply = async (userMessage: string, history: ChatMessage[]): Promise<string> => {
    try {
        if (!chat) {
            chat = initializeChat();
        }

        // To keep the API call lighter, we can send a summarized history or just the last few messages.
        // For simplicity here, we'll just send the new message.
        // In a real app, you would manage history more carefully.
        
        const response = await chat.sendMessage({ message: userMessage });

        return response.text;
    } catch (error) {
        console.error("Error getting reply from Gemini API:", error);
        return "I'm having a little trouble connecting right now. Please try again in a moment.";
    }
};
