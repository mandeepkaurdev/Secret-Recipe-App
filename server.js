const express = require("express");

const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
require('./routes/api-routes')(app);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://user:password123@ds033669.mlab.com:33669/heroku_mb8bnprs");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});