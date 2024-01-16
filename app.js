import express from "express";
import userRouter from "./routes/user.js";
import roomRouter from "./routes/room.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app=express();

config({
    path: "./data/config.env",
  });

  // Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// const Item = mongoose.model('Item', itemSchema);

// app.get("/api/items", async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/room", roomRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
app.use(errorMiddleware);
