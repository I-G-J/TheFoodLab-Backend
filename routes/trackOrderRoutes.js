import express from "express";
import { trackOrder } from "../controllers/TrackOrderController.js";

const router = express.Router();

router.get("/:orderId", trackOrder);

export default router;
