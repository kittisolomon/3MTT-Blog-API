const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const rateLimit = require("express-rate-limit");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

// Connect to the Database
const db = require('./db/database.js');
db.connectToMongoDB();

//  routers
const authRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)

app.use(helmet())
app.use(cors());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));
app.use(fileUpload());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);


app.get("/", (req, res) => {
    res.send("Welcome to my 3MTT Blog API Assessment");
})


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})

module.exports = app
