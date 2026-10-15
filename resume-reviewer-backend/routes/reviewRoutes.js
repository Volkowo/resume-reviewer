const { GeminiReviewer } = require('../services/geminiReviewer');
const reviewer = new GeminiReviewer();
var requirement = {
    totalRequirement: 0,
    explicitMatch: 0,
    implicitMatch: 0,
    noneMatch: 0
}

function route(app) {
    app.post('/api/review', async function (req, res) {
        if (!req.body) {
            return res.status(400).json({ message: 'Invalid input. Please provide a job description and resume.' });
        }

        const { jobDesc, resume } = req.body;
        console.log(`BACKEND - Review API is working with job description: ${jobDesc}`);
        console.log(`BACKEND - Review API is working with resume: ${resume}`);

        if(typeof jobDesc !== 'string' || !jobDesc.trim()) {
            return res.status(400).json({ message: 'Invalid input. Please provide a valid job description.' });
        }

        if(typeof resume !== 'string' || !resume.trim()) {
            return res.status(400).json({ message: 'Invalid input. Please provide a valid resume.' });
        }

        try {
            const feedback = await reviewer.review(resume, jobDesc);

            // TESTING ZONE
            explicitMatch = 0;
            implicitStrong = 0;
            implicitWeak = 0;
            noneMatch = 0;
            totalRequirement = feedback.requirements.length;

            for (const requirement of feedback.requirements) {
                switch(requirement.matchType) {
                    case "explicitMatch":
                        explicitMatch++;
                        break;
                    case "implicitWeak":
                        implicitWeak++;
                        break;
                    case "implicitStrong":
                        implicitStrong++;
                        break;
                    case "none":
                        noneMatch++;
                        break;
                }
            }
            console.log(`
            TOTAL REQUIREMENTS: ${totalRequirement}
            ========================================
            1. Explicit Match: ${explicitMatch}
            2. Implicit Match: ${implicitStrong + implicitWeak}
                a. Implicit Weak Match: ${implicitWeak}
                b. Implicit Strong Match: ${implicitStrong}
            3. None Match: ${noneMatch}
            `)

            return res.json({ feedback });
        } catch (err) {
            console.error('Error during review:', err);
            return res.status(500).json({ message: 'An error occurred while processing the review.' });
        }
    });
}

module.exports = {route};
