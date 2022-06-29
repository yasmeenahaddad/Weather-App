const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use(express.static('./website'));
// Server Port
const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log(`Server Runing on port ${port}`);
}

// GET Route
app.get("/getData", getData);
function getData(req, res) {
    res.send(projectData);
}

// POST Route
app.post("/postData", postData);
function postData(req, res) {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    res.send(projectData);
}