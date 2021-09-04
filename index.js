const express = require("express");
const res = require("express/lib/response");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 8000;

const app = express();

// app.use(morgan());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
