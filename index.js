require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Fingerprint = require("express-fingerprint");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const markersRoutes = require("./src/marker/routes");
const authRoutes = require("./src/auth/routes");

const app = express();
const port = 3001;
// const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://map5-front.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
);

app.use("/api/v1/markers", markersRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => console.log(`app ${port}`));
