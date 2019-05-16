const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/testget', (req, res) => {
    res.send({ express: 'Express GET Test' });
});

app.post('/api/testpost', (req, res) => {
    console.log(req.body);
    res.send(
        `Express POST Test Result: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));