// @ts-nocheck
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static(path.join(__dirname, "client", "build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.reserve(__dirname, "client", "build", "index.html"));
//   });
// }

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    app.listen(PORT, () => console.log(`start ${PORT}`));
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1);
  }
}
start();
