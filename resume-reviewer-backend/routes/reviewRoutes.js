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

        const feedback = await reviewer.review(resume, jobDesc);
        res.json({ feedback });
    });
}

module.exports = {route};
