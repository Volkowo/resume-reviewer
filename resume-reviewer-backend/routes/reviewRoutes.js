const { GeminiReviewer } = require('../services/geminiReviewer');
const reviewer = new GeminiReviewer();
var requirement = {
    totalRequirement: 0,
    explicitMatch: 0,
    implicitStrong: 0,
    implicitWeak: 0,
    noneMatch: 0
}

function route(app) {
    app.post('/api/review', async function (req, res) {
        if (!req.body) {
            return res.status(400).json({ message: 'Invalid input. Please provide a job description and resume.' });
        }

        const { jobDesc, resume } = req.body;
        // console.log(`BACKEND - Review API is working with job description: ${jobDesc}`);
        // console.log(`BACKEND - Review API is working with resume: ${resume}`);

        if(typeof jobDesc !== 'string' || !jobDesc.trim()) {
            return res.status(400).json({ message: 'Invalid input. Please provide a valid job description.' });
        }

        if(typeof resume !== 'string' || !resume.trim()) {
            return res.status(400).json({ message: 'Invalid input. Please provide a valid resume.' });
        }

        try {
            const feedback = await reviewer.review(resume, jobDesc);

            // TESTING ZONE
            const requirements = feedback.requirements;

            requirement = countRequirement(requirements)

            console.log(`
            TOTAL REQUIREMENTS: ${requirement.totalRequirement}
            ========================================
            1. Explicit Match: ${requirement.explicitMatch}
            2. Implicit Match: ${requirement.implicitStrong + requirement.implicitWeak}
                a. Implicit Weak Match: ${requirement.implicitWeak}
                b. Implicit Strong Match: ${requirement.implicitStrong}
            3. None Match: ${requirement.noneMatch}
            `)

            return res.json({ feedback });
        } catch (err) {
            console.error('Error during review:', err);
            return res.status(500).json({ message: 'An error occurred while processing the review.'});
        }
    });
}

function countRequirement(requirements) {
    var explicitMatch = 0;
    var implicitStrong = 0;
    var implicitWeak = 0;
    var noneMatch = 0;

    for (const requirement of requirements) {
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

    return { explicitMatch, implicitStrong, implicitWeak, noneMatch, totalRequirement: requirements.length };
}

module.exports = {route};
