function route(app) {
    app.post('/api/review', async function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        const { jobDesc } = req.body;
        console.log(`Review API is working with job description: ${jobDesc}`);
    });
}

module.exports = {route};