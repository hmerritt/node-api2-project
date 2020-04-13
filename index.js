const express = require("express");
const db = require("./data/db");

//
const server = express();
const port = 8000;

server.use(express.json());

//  Start http server
server.listen(port, () => {
    console.log(`Server listening at localhost:${port}`);
});
