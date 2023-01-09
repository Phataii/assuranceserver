const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { expressjwt: jwt } = require("express-jwt");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
require("express-async-errors");

dotenv.config();

// set up server

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://www.assuranceetrade.info"
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.set("trust proxy", 1);

app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

// set up routes

app.use("/auth", require("./routers/userRouter"));
app.use("/transaction", require("./routers/transactionRouter"));
app.use("/message", require("./routers/messageRouter"));
app.use("/dash", require("./routers/dashRouter"));
app.use(errorHandler);

mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
