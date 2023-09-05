const express = require("express");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(function (req, res, next) {
  res.set(
    "cache-control",
    "no-cache , no-store,must-revalidate,max-stale=0,post-check=0,pre-checked=0"
  );
  next();
});
app.use("/api", adminRoutes);
app.use("/assets/images", express.static("assets/images"));

app.listen(process.env.PORT, () => {
  console.log(`Server running at PORT ${process.env.PORT}`);
});
