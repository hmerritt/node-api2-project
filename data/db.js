const knex = require("knex");
const knexConfig = require("../knexfile.js");
const database = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,
};

function find() {
    return database("posts");
}

function findById(id) {
    return database("posts").where({ id: Number(id) });
}

function insert(post) {
    return database("posts")
        .insert(post, "id")
        .then((ids) => ({ id: ids[0] }));
}

function update(id, post) {
    return database("posts").where("id", Number(id)).update(post);
}

function remove(id) {
    return database("posts").where("id", Number(id)).del();
}

function findPostComments(postId) {
    return database("comments")
        .join("posts", "posts.id", "post_id")
        .select("comments.*", "title as post")
        .where("post_id", postId);
}

function findCommentById(id) {
    return database("comments")
        .join("posts", "posts.id", "post_id")
        .select("comments.*", "title as post")
        .where("comments.id", id);
}

function insertComment(comment) {
    return database("comments")
        .insert(comment)
        .then((ids) => ({ id: ids[0] }));
}
