import 'dotenv/config';
import express from "express";

const cors = require('cors');
const http = require('http');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const reviewRoutes = require('../routes/reviewRoutes');
reviewRoutes.route(app)

app.get("/", (req, res) => {
    res.send("API is running!")
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost/${PORT}`)
})
