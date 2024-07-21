require("dotenv").config({ path: "./config.env" });
const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

// Get all users (/)
// http://localhost:3000/users
userRoutes.route("/users").get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("users").find({}).toArray(); // Find all users.

  if (data.length > 0) {
    response.json(data);
  } else {
    return;
  }
});

// Get a single post (/users/:id)
// http://localhost:3000/users/:id
userRoutes.route("/users/:id").get(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .findOne({ _id: new ObjectId(request.params.id) }); // Find one post.

  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    return;
  }
});

// Create a new user (/users)
// http://localhost:3000/users
userRoutes.route("/users").post(async (request, response) => {
  let db = database.getDb();

  const takenEmail = await db
    .collection("users")
    .findOne({ email: request.body.email });

  if (takenEmail) {
    response.json({ error: "email_taken", message: "Email already taken." });
  } else {
    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);

    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      password: hash,
      joinDate: new Date(),
      posts: [],
    };
    let data = await db.collection("users").insertOne(mongoObject); // Insert a post.
    response.json(data);
  }
});

// Update a post (/users/:id)
userRoutes.route("/users").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      joinDate: request.body.joinDate,
      posts: request.body.posts,
    },
  };
  let data = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject); // Update a post.
  response.json(data);
});
// Delete a post (/post/:id)
userRoutes.route("/users/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(request.params.id) }); // Find one post.
  response.json(data);
});

// Login a user (/users/login)
// http://localhost:3000/users/login
userRoutes.route("/users/login").post(async (request, response) => {
  let db = database.getDb();

  const user = await db
    .collection("users")
    .findOne({ email: request.body.email });

  if (user) {
    let confirmation = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1h" });
      response.json({ success: true, token });
    } else {
      response.json({
        success: false,
        message: "Incorrect password.",
      });
    }
  } else {
    response.json({
      success: false,
      message: "User not found.",
    });
  }
});

module.exports = userRoutes;
