const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3969;
const connectToDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

connectToDB();
const app = express();

// const corsOptions = {
//   origin: "http://localhost:5173", // Frontend URL
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Allow credentials
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log("====================================");
  console.log(`Goto: ` + `http://localhost:${port}`.yellow.underline);
});
