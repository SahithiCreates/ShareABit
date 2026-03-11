require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB(); 

app.use(cors());
app.use(express.json());

const foodRoutes=require("./routes/foodRoutes");
app.use("/api/food",foodRoutes);

const authRoutes=require("./routes/authRoutes");
app.use("/api/auth",authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
