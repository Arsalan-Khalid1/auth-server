const express = require("express");
const res = require("express/lib/response");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get("/api/v1/sign_up", async (req, res) => {
  res.json({
    message: "api is working",
  });
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
