import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const ai = new GoogleGenAI({}); // Reads GEMINI_API_KEY
const resumeJSONSchema = {
    type: "object",
    properties: {
        reviewSummary : {
            type: "string",
            description: "Provide a concise overall assessment of how well the candidate's resume meets the job description. Highlight key strengths, significant gaps, and areas for improvement.",
        },
        requirements: {
            type: "array",
            description: "Identify distinct skills, qualifications, experiences, and responsibilities explicitly requested in the job description. Avoid duplicate requirements.",
            items: {
                type: "object",
                properties: {
                    requirementID: {type: "string", description: "A unique identifier for this requirement within the response, using the format REQ001, REQ002, etc."},
                    requirementText: {type: "string", description: "The specific requirement extracted from the job description. Preserve the original meaning without adding qualifications or expectations not stated."},
                    matchType : {
                        type: "string", 
                        enum: ["explicitMatch", "implicitStrong", "implicitWeak", "none"], 
                        description: `Classify how well the candidate's provided evidence satisfies the requirement:
                        - explicitMatch: The requirement is directly demonstrated or clearly stated in the candidate's evidence.
                        - implicitStrong: The requirement is not explicitly stated, but the evidence strongly demonstrates it through relevant activities, responsibilities, or achievements.
                        - implicitWeak: The evidence suggests some transferable or related capability, but does not sufficiently demonstrate the full requirement.
                        - none: No relevant supporting evidence was found in the provided sources.
                        Base the classification only on the supplied information. Do not assume unmentioned experience or qualifications. 
                        Do not treat experience with a related technology as proof of experience with a specifically named technology.`
                    },
                    explanation : {type: "string", description: "Explain how the available evidence supports the assigned match classification. Identify any relevant limitations or missing information."},
                    evidence : {
                        type: "array",
                        description: "A list of evidence from the candidate's provided resume, job history, or project history that directly or indirectly supports this requirement. Return an empty array if no relevant evidence exists",
                        items: {
                            type: "object",
                            properties: {
                                "evidenceID": {type: "string", description: "A unique identifier for this evidence source, using the same ID when the same evidence is referenced elsewhere in the response."},
                                "sourceType": {type: "string", enum: ["resume", "jobHistory", "projectHistory"], description: "Identifies whether the evidence comes from the submitted resume, stored job history, or stored project history."},
                                "sourceText": {type: "string", description: "An exact, unmodified quotation from the specified source. Do not paraphrase, embellish, or invent evidence."}
                            },
                            required: ["evidenceID", "sourceType", "sourceText"],
                            additionalProperties: false
                        }
                    }
                },
                required: ["requirementID", "requirementText", "matchType", "explanation", "evidence"],
                additionalProperties: false
            }
        },
        suggestedActions: {
            type: "array",
            description: "A list of suggested actions for improving the resume based on the review.",
            items: {
                type: "object",
                properties: {
                    actionID: {type: "string", description: "A unique identifier for the suggested action, using the format ACT001, ACT002, etc."},
                    requirementID: {type: "string", description: "The unique identifier of the requirement that this suggested action addresses."},
                    actionText: {type: "string", description: "Provide a specific, actionable recommendation for improving the resume's alignment with the associated job requirement without inventing experience or qualifications."},
                    explanation: {type: "string", description: "Explain why this action would improve the resume's alignment with the associated requirement. Reference existing evidence where available, and identify relevant gaps or limitations. Do not assume the candidate has experience that has not been provided."},
                    evidence : {
                        type: "array",
                        description: "Existing evidence from the candidate's provided sources that is relevant to the suggested action. Return an empty array if the recommendation addresses a gap with no supporting evidence.",
                        items: {
                            type: "object",
                            properties: {
                                "evidenceID": {type: "string", description: "A unique identifier for this evidence source, using the same ID when the same evidence is referenced elsewhere in the response."},
                                "sourceType": {type: "string", enum: ["resume", "jobHistory", "projectHistory"], description: "Identifies whether the evidence comes from the submitted resume, stored job history, or stored project history."},
                                "sourceText": {type: "string", description: "An exact, unmodified quotation from the specified source. Do not paraphrase, embellish, or invent evidence."}
                            },
                            required: ["evidenceID", "sourceType", "sourceText"],
                            additionalProperties: false
                        }
                    }
                },
                required: ["actionID", "requirementID", "actionText", "explanation", "evidence"],
                additionalProperties: false
            }
        }
    },
    required: ["reviewSummary", "requirements", "suggestedActions"],
    additionalProperties: false
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


