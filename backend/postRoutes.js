const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

let postRoutes = express.Router();

// Get all posts (/)
// http://localhost:3000/posts
postRoutes.route("/posts").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray(); // Find all posts.

  if (data.length > 0) {
    response.json(data);
  } else {
    return;
  }
});

// Get a single post (/post/:id)
// http://localhost:3000/posts/:id
postRoutes.route("/posts/:id").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(request.params.id) }); // Find one post.

  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    return;
  }
});

// Create a new post (/posts)
// http://localhost:3000/posts
postRoutes.route("/posts").post(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    title: request.body.title,
    description: request.body.description,
    content: request.body.content,
    author: request.body.user._id,
    dateCreated: request.body.dateCreated,
  };
  let data = await db.collection("posts").insertOne(mongoObject); // Insert a post.
  response.json(data);
});

// Update a post (/posts/:id)
postRoutes.route("/posts").put(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      title: request.body.title,
      description: request.body.description,
      content: request.body.content,
      author: request.body.author,
      dateCreated: request.body.dateCreated,
    },
  };
  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject); // Update a post.
  response.json(data);
});
// Delete a post (/post/:id)
postRoutes
  .route("/posts/:id")
  .delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(request.params.id) }); // Find one post.
    response.json(data);
  });

function verifyToken(request, response, next) {
  const authHeaders = request.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (!token)
    return response
      .status(401)
      .json({ message: "Authentication token is missing." });

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      response
        .status(403)
        .json({ message: "Authentication token is invalid." });
    }

    request.body.user = user;
    next();
  });
}

module.exports = postRoutes;
