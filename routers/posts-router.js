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
            if (data.length) {
                res.status(201).json(data[0]);
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

//  Removes the post with the specified id and returns the deleted post object.
//  You may need to make additional calls to the database in order to satisfy this requirement
router.delete("/:id", (req, res) => {
    //  Get request body
    const postId = req.params.id;

    //  Get post
    db.findById(postId).then((originalPostData) => {
        //  Remove record to db
        db.remove(postId)
            .then((data) => {
                if (data) {
                    res.status(201).json(originalPostData[0]);
                } else {
                    res.status(404).json({
                        message:
                            "The post with the specified ID does not exist.",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    error: "The post could not be removed",
                });
            });
    });
});

//  Updates the post with the specified id using data from the request body.
//  Returns the modified document, NOT the original.
router.put("/:id", (req, res) => {
    //  Get request body
    const postData = req.body;
    const postId = req.params.id;

    //  Check for required post data
    if (!postData.title || !postData.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
        });
    }

    //  Add record to db
    db.update(postId, postData)
        .then((data) => {
            if (data) {
                db.findById(postId).then((data) => {
                    res.status(201).json(data);
                });
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: "The post information could not be modified.",
            });
        });
});

module.exports = router;
