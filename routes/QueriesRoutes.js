import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  createQueries,
  getQueries,
  deleteQueries,
} from "../controllers/QueriesController.js";

const router = express.Router();
// Public route for users to submit a query
router.post("/", createQueries);

// Admin routes to view and delete queries
router.get("/", adminMiddleware, getQueries);

// Delete a query
router.delete("/:id", adminMiddleware, deleteQueries);

export default router;
