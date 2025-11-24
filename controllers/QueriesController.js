import Queries from "../models/QueriesModel.js";

// Create / Save a new query from contact form
export const createQueries = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const newQuery = await Queries.create({ name, email, message });

    res.status(201).json({ success: true, data: newQuery });
  } catch (error) {
    console.error("Error saving query:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch all queries for admin
export const getQueries = async (req, res) => {
  try {
    const allQueries = await Queries.find().sort({ createdAt: -1 });
    res.json({ success: true, data: allQueries });
  } catch (error) {
    console.error("Error fetching queries:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch queries" });
  }
};

// Delete a single query
export const deleteQueries = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Queries.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Query not found" });
    }

    res.json({ success: true, message: "Query deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to delete query" });
  }
};
