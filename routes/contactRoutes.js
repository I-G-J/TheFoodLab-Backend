import express from "express";
import { submitMessage } from "../controllers/contactController.js";

const router = express.Router();
router.post("/", submitMessage);

export default router;
