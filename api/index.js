import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import moment from "moment";
import { db } from "./db.js";
import cors from "cors";


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());




app.use(cors({
  origin: "https://projetuptsadyf.onrender.com", // Replace with the URL of your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

// Upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Fetch Comments for a Post
app.get("/api/comments/:postId", (req, res) => {
  const postId = req.params.postId;
  const query = "SELECT * FROM comments WHERE postId = ? ORDER BY date ASC";
  db.query(query, [postId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch comments." });
    }
    res.json(results);
  });
});

// Add a New Comment
app.post("/api/comments", (req, res) => {
  const { postId, userId, text } = req.body;

  // Fetch username from users table
  const userQuery = "SELECT username FROM users WHERE id = ?";
  db.query(userQuery, [userId], (err, userResult) => {
    if (err || userResult.length === 0) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch user." });
    }

    const username = userResult[0].username;
    const query =
      "INSERT INTO comments (postId, userId, username, text, date) VALUES (?, ?, ?, ?, ?)";
    const date = moment().format("YYYY-MM-DD HH:mm:ss");

    db.query(query, [postId, userId, username, text, date], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to add comment." });
      }

      res.json({
        id: result.insertId,
        postId,
        userId,
        username,
        text,
        date,
      });
    });
  });
});

// Server listening
app.listen(8800, () => {
  console.log("Backend server is running on port 8800!");
});
