import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import cors from "cors";
import express from "express";

const port = process.env.PORT || 4000;

connectDB();

app.use(cors());



app.listen(port, () => {
  console.log(
    `Server is working on port:${port} in ${process.env.NODE_ENV} Mode`
  );
});




