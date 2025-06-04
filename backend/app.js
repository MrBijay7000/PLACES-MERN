const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: "https://places-mern-two.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => console.log(err));
  }
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown error" });
});

// ✅ Connect to DB regardless of env (so Vercel works)
mongoose
  .connect(
    "mongodb+srv://thelordshadow13:kjpDBQPFhwwaT76A@cluster0.aeql0sp.mongodb.net/places?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    // ✅ Only start listening locally
    if (process.env.NODE_ENV !== "production") {
      app.listen(5001, () => {
        console.log("Server started on port 5001");
      });
    }
  })
  .catch((err) => console.log(err));

// ✅ Export app for Vercel serverless
// module.exports = app;

// mongoose
//   .connect(
//     "mongodb+srv://thelordshadow13:kjpDBQPFhwwaT76A@cluster0.aeql0sp.mongodb.net/places?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then(() => {
//     app.listen(5001);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = app;
