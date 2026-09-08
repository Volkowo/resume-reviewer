function route(app) {
    app.post('/api/review', async function (req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        const { jobDesc, resume } = req.body;
        console.log(`BACKEND - Review API is working with job description: ${jobDesc}`);
        console.log(`BACKEND - Review API is working with resume: ${resume}`);
    });
}

module.exports = {route};