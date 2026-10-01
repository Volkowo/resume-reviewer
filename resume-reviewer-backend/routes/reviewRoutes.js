const { GeminiReviewer } = require('../services/geminiReviewer');
const reviewer = new GeminiReviewer();

function route(app) {
    app.post('/api/review', async function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        const { jobDesc, resume } = req.body;
        console.log(`BACKEND - Review API is working with job description: ${jobDesc}`);
        console.log(`BACKEND - Review API is working with resume: ${resume}`);

        // const feedback = await reviewer.review(resume, jobDesc);
        const feedback = 
        `
        # Resume Review

        Your resume shows a **strong foundation in software development** for a Junior Software Engineer role.

        ## Key Strengths

        - **Education:** Your Bachelor of Information Technology is relevant to the role.
        - **Practical experience:** Your volunteer and internship work demonstrates experience solving real problems.
        - Developed tools for medical imaging anonymisation.
        - Automated a video workflow using Blender.
        - **Projects:** You have worked with technologies such as \`Angular\`, \`Node.js\`, and \`MongoDB\`.

        ## Areas to Improve

        1. **Explain your impact.**
        Describe what changed as a result of your work.
        2. **Clarify your contribution.**
        Explain which features you personally designed, implemented, or tested.
        3. **Highlight collaboration.**
        Include examples of code reviews, teamwork, or technical documentation.

        ### Example Rewrite

        **Original:**
        Worked on a medical imaging application.

        **Suggested:**
        Developed a Python tool using \`pydicom\` to support medical imaging anonymisation and reduce manual processing.

        *Only include claims that accurately reflect your work.*

        ## Match to the Job Description

        | Requirement | Evidence | Suggested Improvement |
        | --- | --- | --- |
        | Programming skills | University and personal projects | Describe one technical challenge |
        | Teamwork | Internship experience | Explain how you collaborated |
        | Testing | Limited detail provided | Mention tests you actually wrote |

        > Prioritise clear examples of your contribution over long lists of technologies.

        ---

        ## Next Steps

        - Tailor your summary to the role.
        - Add concrete outcomes where available.
        - Check spelling and formatting.

        **Overall:** You have relevant experience to build on. More specific examples would make your resume more convincing.
        `
        console.log(feedback)
        res.json({ feedback });
    });
}

module.exports = {route};
