import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({}); // Reads GEMINI_API_KEY

// TO DO: Improve the prompt (input) to get better results from Gemini AI
export class GeminiReviewer {
    async review(resume: string, jobDesc: string){
        const interaction = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input:
                // `Review this resume against the job description and provide feedback.
                // Suggest improvements to the resume to better match the job description without inventing experience.

                // Resume: ${resume}
                // Job Description: ${jobDesc}
                // `,
                `This is just a test prompt to see if the Gemini AI is working. Please provide a response to this prompt.
                Confirm if you can read resume and job description by mentioning parts of it. You don't need to provide feedback or suggestions for now.
                
                Resume: ${resume}
                Job Description: ${jobDesc}`,
        });
        return interaction.output_text;
    }
}


