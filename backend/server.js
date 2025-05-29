const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookingsRouter = require("./routes/bookings");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
console.log("🔍 Debug: MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Allowed frontend origin
const allowedOrigins = ["https://sri-lab.vercel.app","http://localhost:5173"];

// Use CORS for Express (REST APIs)
app.use(cors({
  origin: allowedOrigins[0], 
  credentials: true,         // allow cookies if needed
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Routes
app.use("/api/bookings", bookingsRouter);

// Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = await result.response;

    if (!response) return res.status(500).json({ error: "Failed to generate response" });

    res.json({ response: response.text() });
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
    origin: allowedOrigins[0],
    methods: ["GET", "POST"]
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
  });
});

// Optional: Export server for testing or external usage
module.exports = server;
