import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import petRouter from "./routes/pet.js";
import adminRouter from "./routes/admin.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// http//localhost:500/users/signup
app.use("/users", userRouter);

app.use("/pet", petRouter);

app.use("/admin", adminRouter);

const MONGODB_URL =
  "mongodb+srv://leobh76:1234567890@cluster0.75nfin9.mongodb.net/pets_db?retryWrites=true&w=majority";

const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
