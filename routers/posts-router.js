const express = require("express");
const db = require("../data/db");
const router = express.Router();

//  Returns an array of all the post objects contained in the database
router.get("/", (req, res) => {
    db.find()
        .then((data) => {
            //throw "Forced error at GET: /api/posts";
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: "The posts information could not be retrieved",
            });
        });
});

//  Creates a post using the information sent inside the request body
router.post("/", (req, res) => {
    //  Get request body
    const postData = req.body;

    //  Check for required post data
    if (!postData.title || !postData.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
        });
    }

    //  Add record to db
    db.insert(postData)
        .then((postId) => {
            //throw "Forced error at POST: /api/posts";
            res.status(201).json({ ...postId, ...postData });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error:
                    "There was an error while saving the post to the database",
            });
        });
});

//  Returns the post object with the specified id
router.get("/:id", (req, res) => {
    //  Get request body
    const postId = req.params.id;

    //  Add record to db
    db.findById(postId)
        .then((data) => {
            //throw "Forced error at POST: /api/posts";
            if (data.length) {
                res.status(201).json(data);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: "The post information could not be retrieved.",
            });
        });
});

module.exports = router;
