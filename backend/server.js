const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookingsRouter = require("./routes/bookings");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { generateResponse } = require("./services/geminiApi");

dotenv.config();
console.log("🔍 Debug: MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Allowed frontend origins for both development and production
const allowedOrigins = [
  "http://localhost:5173",           // Local development
  "http://localhost:3000",           // Alternative local port
  "https://sri-lab.vercel.app",      // Production frontend
  "https://sri-lab-frontend.vercel.app", // Alternative production URL
  "https://sri-lab-backend.vercel.app"   // Backend URL (if needed)
];

// Use CORS for Express (REST APIs)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked origin:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Routes
app.use("/api/bookings", bookingsRouter);

// Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await generateResponse(message);
    res.json({ response });
  } catch (error) {
    console.error("❌ Chat API Error:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
});

// Create HTTP server and bind to app
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("🟢 A user connected");
  socket.on("disconnect", () => console.log("🔴 User disconnected"));
});

// Start server only after MongoDB connects
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 CORS enabled for origins:`, allowedOrigins);
  });
});

// Optional: Export server for testing or external usage
module.exports = server;
