import { GoogleGenAI } from "@google/genai";
import { ResumeReviewConfig } from "../prompts/resumeReviewConfig";
import * as z from "zod";

const ai = new GoogleGenAI({}); // Reads GEMINI_API_KEY
const resumeJSONSchema: Parameters<typeof z.fromJSONSchema>[0] = ResumeReviewConfig.setSchema();

const resumeSchema = z.fromJSONSchema(resumeJSONSchema);
const sampleOutput = ResumeReviewConfig.setSampleOutput();

export class GeminiReviewer {
    async review(resume: string, jobDesc: string){
        const input = ResumeReviewConfig.setPrompt(resume, jobDesc);
        return sampleOutput; // For now, return the sample output. Uncomment the code below to enable actual Gemini review.
        // const startedAt = performance.now();
        // try {
        //     const interaction = await ai.interactions.create({
        //         model: "gemini-3.8-flash",
        //         input: "Reply with just: Hello.",
        //         response_format: {
        //             type: 'text',
        //             mime_type: 'application/json',
        //             schema: resumeJSONSchema
        //         }
        //     }, 
        //     {
        //         maxRetries: 0
        //     }
        // );

        //     if (!interaction.output_text) {
        //         throw new Error("Gemini didn't return any review output.");
        //     }

        //     const result = resumeSchema.safeParse(JSON.parse(interaction.output_text));

        //     if (!result.success) {
        //         throw result.error; // Throw the ZodError if the output doesn't match the schema
        //     }

        //     return result.data;
        // } finally {
        //     console.log(
        //         `Review completed or failed after ${
        //             ((performance.now() - startedAt) / 1000).toFixed(2)
        //         } seconds`
        //     );
        // }
    }
}