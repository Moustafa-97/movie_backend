const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const process = require("process");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
// const { theUser } = require("./models/User");
const cookieParser = require("cookie-parser");
const server = require("http").createServer();
const {
  user_post_signup,
  user_post_login,
} = require("./controllers/AuthControl");
// const io = require("socket.io")(server);
const {
  add_remove_wishlist,
  user_search,
  discover_page,
  movie_detail,
  add_remove_watched,
  movie_page_popular,
  trending_page,
  get_wishlist_watched_elements,
  series_page,
  top_rated,
} = require("./controllers/UserControl");

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve("../");
  app.use(express.static(path.join(__dirname + "/frontendmovieclient/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(
      path.resolve(__dirname, "frontendmovieclient", "build", "index.html")
    );
    next();
  });
} else {
  app.get("/", (req, res, next) => {
    res.send("server is ready");
    next();
  });
}

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, parameterLimit: 50000 }));
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(
  cors({
    origin: "https://ourmovieworld.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionSuccessStatus: 200,
    // for cookies::
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// mongo setup
mongoose.set("strictQuery", false);

// mvc
// login singup
app.post("/signup", user_post_signup);
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});
app.post("/login", user_post_login);
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});
// search
app.post("/search", user_search);
app.get("/search", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});
// menu wush wash
app.post("/Wishlist", get_wishlist_watched_elements);
app.post("/Watched", get_wishlist_watched_elements);
app.get("/Wishlist", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});
app.get("/Watched", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});
// discover page
app.post("/Discover", discover_page);
app.post("/Top", top_rated);
app.get("/Discover", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});
app.get("/Top", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});

// home page section and popular page
app.post("/Popular", movie_page_popular);
app.get("/Popular", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});

// home page section
app.post("/Trending", trending_page);
app.get("/Trending", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});

// details
app.post("/Moviedetails", movie_detail);
app.get("/Moviedetails", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});

// add and remove operation
app.put("/AddRemoveWatch", add_remove_watched);
app.put("/AddRemoveWish", add_remove_wishlist);
app.get("/AddRemoveWatch", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});
app.get("/AddRemoveWish", (req, res) => {
  res.sendFile(__dirname + "/frontendmovieclient/build/index.html");
});

// series section (plan to do...)
// app.post("/Series", series_page);

// still not mvc

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// set Routes
// app.use("/auth", require("./routes/UserRoutes"));




// comments

// responsible to frontend connect
// cors

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000/Trending");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//   res.setHeader("Access-Control-Max-Age", 7200);

//   next();
// });