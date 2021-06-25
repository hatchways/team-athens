const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const { notFound, errorHandler } = require("./middleware/error");
const protect = require("./middleware/auth");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const notificationRouter = require('./routes/notifications');
const imagesRouter = require("./routes/imageUpload");
const { initScrapingJobs } = require("./utils/taskQueue");
const ListRouter = require("./routes/list");
const productRouter = require("./routes/product");
const scraperRouter = require("./routes/scraper");
const publicProfilesRouter = require("./routes/publicProfiles");
const { initSocketServer } = require("./utils/socketServer");

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  initSocketServer(server, req);
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use('/notifications', notificationRouter);
app.use("/images", imagesRouter);
app.use("/lists", ListRouter);
app.use("/products", productRouter);
app.use('/scrape', scraperRouter);
app.use('/public-lists', publicProfilesRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

initScrapingJobs();

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
