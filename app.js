// @ts-nocheck
const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(
  "**",
  createProxyMiddleware({
    target: "https://app-shorting-link-fullstack.netlify.app",
    secure: false,
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("PORT") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("MONGO_DB"));
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
