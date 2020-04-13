//  Import libs + routes
const express = require("express");
const routerBase = require("./routers/base-router");
const routerPosts = require("./routers/posts-router");

//
const server = express();
const port = 8000;

//  Add express middleware
server.use(express.json());
server.use("/api/posts", routerPosts);
server.use("/", routerBase);

//  Start http server
server.listen(port, () => {
    console.log(`Server listening at localhost:${port}`);
});
