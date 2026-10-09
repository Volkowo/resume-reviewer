import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const ai = new GoogleGenAI({}); // Reads GEMINI_API_KEY
const resumeJSONSchema = {
    type: "object",
    properties: {
        reviewSummary : {
            type: "string",
            description: "A summary of the resume review by comparing the resume with the job description.",
        },
        requirements: {
            type: "array",
            description: "A list of requirements from the job description.",
            items: {
                type: "object",
                properties: {
                    requirementID: {type: "string", description: "A unique identifier for the requirement."},
                    requirementText: {type: "string", description: "The text of the requirement."},
                    matchType : {type: "string", enum: ["explicitMatch", "implicitStrong", "implicitWeak", "none"], description: "The type of match between the resume and the requirement."},
                    explanation : {type: "string", description: "An explanation of why the requirement was classified as it was."},
                    evidence : {
                        type: "array",
                        description: "A list of evidence from the resume that supports the match type classification.",
                        items: {
                            type: "object",
                            properties: {
                                "sourceID": {type: "string", description: "A unique identifier for the source of the evidence."},
                                "sourceType": {type: "string", enum: ["resume", "jobHistory", "projectHistory"], description: "The type of source (e.g., resume, cover letter, etc.) from which the evidence was extracted."},
                                "sourceText": {type: "string", description: "The exact quotation from the resume that serves as evidence for the match type classification."}
                            },
                            required: ["sourceID", "sourceType", "sourceText"]
                        }
                    }
                },
                required: ["requirementID", "requirementText", "matchType", "explanation", "evidence"]
            }
        },
        suggestedActions: {
            type: "array",
            description: "A list of suggested actions for improving the resume based on the review.",
            items: {
                type: "object",
                properties: {
                    actionID: {type: "string", description: "A unique identifier for the suggested action."},
                    requirementID: {type: "string", description: "The unique identifier of the requirement that this suggested action addresses."},
                    actionText: {type: "string", description: "The text of the suggested action."},
                    explanation: {type: "string", description: "An explanation of why the suggested action is recommended."},
                    evidence : {
                        type: "array",
                        description: "A list of evidence from the resume that supports the match type classification.",
                        items: {
                            type: "object",
                            properties: {
                                "sourceID": {type: "string", description: "A unique identifier for the source of the evidence."},
                                "sourceType": {type: "string", enum: ["resume", "jobHistory", "projectHistory"], description: "The type of source (e.g., resume, cover letter, etc.) from which the evidence was extracted."},
                                "sourceText": {type: "string", description: "The exact quotation from the resume that serves as evidence for the match type classification."}
                            },
                            required: ["sourceID", "sourceType", "sourceText"]
                        }
                    }
                },
                required: ["actionID", "requirementID", "actionText", "explanation", "evidence"]
            }
        }
    },
    required: ["reviewSummary", "requirements", "suggestedActions"]
}


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


