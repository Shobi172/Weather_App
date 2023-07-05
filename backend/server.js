const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
