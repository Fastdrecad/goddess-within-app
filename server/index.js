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
const setupDB = require("./config/db");

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
  "https://goddess-within.andrijadesign.com",
  "https://www.goddess-within.andrijadesign.com" // Production origin
];

// CORS options
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`Origin ${origin} not allowed by CORS`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600 // Cache preflight requests for 10 minutes
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
