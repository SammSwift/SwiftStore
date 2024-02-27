import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import uploadRouter from "./routes/uploadRoutes.js";

// Config
dotenv.config();
const PORT = process.env.PORT || 5000;

// App
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode...");
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //any route that is not api will be redirected to the index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Custom error middleware
app.use(notFound);
app.use(errorHandler);

// Server
const startServer = () => {
  connectDB();
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
    );
  });
};

startServer();
