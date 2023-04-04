require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");

//bringing the app constants
const PORT = process.env.PORT;

// initialize the express application
const app = express();

// initialize the hsb engine
app.set("view engine", "ejs");

//initialize database connection
require("./Database/connection");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// users router middleware for getting the requests

const usersRoute = require("./router/usersRouter");

app.use("/api/users", usersRoute);

// start listening the server
app.listen(PORT, () => {
  console.log(`listening on port http://127.0.0.1:${PORT}/`);
});
