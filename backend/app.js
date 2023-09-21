const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes');

const app = express();

app.use(cors());
app.options('*', cors()) // allows all request
app.use(bodyParser.json());

app.use('/api/v1', router);

port = 3000;
const server = (port) => {
    try {
        app.listen(port, () => {
            console.log(`server up and running on port ${port}`);
        });
    } catch (e) {
        console.log(`ERR: server not started\n ERR: ${e}`);
        process.exit();
    }
};

server(port)