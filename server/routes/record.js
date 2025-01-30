import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";


// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching record");
  }
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.confirmPassword) {
      return res.status(400).send("Missing required fields");
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    let newDocument = {
      email: req.body.email,
      password: hashedPassword,
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(201);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate that email is provided
    if (!email) {
      console.error("Email is required");
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if the email exists in the database (case-insensitive)
    let collection = await db.collection("users");

    let existingUser = await collection.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ exists: true, message: "Email already exists" });
    } else {
      return res.status(200).json({ exists: false, message: "Email is available" });
    }
  } catch (err) {
    console.error("Error checking email: ", err); // Log the full error object
    res.status(500).json({ error: "An error occurred while checking the email" });
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        email: req.body.email,
        password: req.body.password,
      },
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("users");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;