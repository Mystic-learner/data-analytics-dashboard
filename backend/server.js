require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/analyticsRoutes"));

// ✅ ONLY ONE PORT DECLARATION
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});