const express = require("express");
const methods = require("./test/exporter");
const bodyParser = require("body-parser");

const app = express();
const port = 42069;

app.use(bodyParser.json());

const methodList = methods.module1;

app.post('/', async (req, res) => {
    const method = req.headers["x-method"];
    const found = methodList[method];
    if (!found) {
        res.status(404).send("Method not found");
        return;
    }
    try {
        const out = await found(req);
        res.status(200).send(out);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
