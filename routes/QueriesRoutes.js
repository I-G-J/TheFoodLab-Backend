import express from "express";
import {
  createQueries,
  getQueries,
  deleteQueries,
} from "../controllers/QueriesController.js";

const router = express.Router();

// Save new user query
router.post("/", createQueries);

// Get all queries
router.get("/", getQueries);

// Delete a query
router.delete("/:id", deleteQueries);

export default router;
