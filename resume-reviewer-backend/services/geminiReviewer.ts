import { GoogleGenAI } from "@google/genai";
import { ResumeReviewConfig } from "../prompts/resumeReviewConfig";
import * as z from "zod";

const ai = new GoogleGenAI({}); // Reads GEMINI_API_KEY
const resumeJSONSchema: Parameters<typeof z.fromJSONSchema>[0] = ResumeReviewConfig.setSchema();

const resumeSchema = z.fromJSONSchema(resumeJSONSchema);

export class GeminiReviewer {
    async review(resume: string, jobDesc: string){
        const input = ResumeReviewConfig.setPrompt(resume, jobDesc);
        const interaction = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input: input,
            response_format: {
                type: 'text',
                mime_type: 'application/json',
                schema: resumeJSONSchema
            }
        });

        if (!interaction.output_text) {
            throw new Error("Gemini didn't return any review output.");
        }

        const result = resumeSchema.safeParse(JSON.parse(interaction.output_text));

        if (!result.success) {
            throw result.error; // Throw the ZodError if the output doesn't match the schema
        }

        return result.data;
    }
}


