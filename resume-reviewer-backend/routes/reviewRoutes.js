const { GeminiReviewer } = require('../services/geminiReviewer');
const reviewer = new GeminiReviewer();

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
            console.log(feedback)
            return res.json({ feedback });
        } catch (err) {
            console.error('Error during review:', err);
            return res.status(500).json({ message: 'An error occurred while processing the review.' });
        }
    });
}

module.exports = {route};
