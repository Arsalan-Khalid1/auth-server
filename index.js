const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 8000;

const app = express();
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => console.log("DB Connection Failed, error => ", err));

app.use(morgan("dev"));
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
