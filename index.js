import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config.js';
import userRouter from "./routes/userRoutes.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import profileRouter from "./routes/profileRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import queriesRouter from "./routes/QueriesRoutes.js";
import trackOrderRouter from "./routes/trackOrderRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); // This is the crucial line to add

// DB Config (make sure you have a .env file with MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log("DB Connection Error: ", error));

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/order", orderRouter);
app.use("/api/profile", profileRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/contact", contactRouter);
app.use("/api/queries", queriesRouter);
app.use("/api/track", trackOrderRouter);


app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});