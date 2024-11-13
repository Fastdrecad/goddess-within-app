require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const chalk = require("chalk");
const helmet = require("helmet");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

const keys = require("./config/keys");
const routes = require("./routes");
const setupDB = require("./utils/db");

const app = express();
const { port } = keys;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);

setupDB();

app.use(morgan("dev"));

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Development origin
  "https://goddess-within.andrijadesign.com" // Production origin
];

// CORS options
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, or services)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

// Use CORS middleware with the options
app.use(cors(corsOptions));

// Define API routes
app.use(routes);

// Static folder setup (assuming your uploads directory is within the project)
// This allows to serve the uploaded images directly from the server
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files and index.html only in production
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDistPath));

  // Serve the index.html file for non-API routes
  app.get(/^\/(?!api).*/, (req, res) =>
    res.sendFile(path.resolve(clientDistPath, "index.html"))
  );
}

app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(
    `${chalk.green("✓")} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});
