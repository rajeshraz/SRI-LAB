const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookingsRouter = require("./routes/bookings");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
console.log("🔍 Debug: MONGO_URI:", process.env.MONGO_URI); // Debugging

const app = express();

// ✅ Wait for MongoDB connection before starting the server
connectDB().then(() => {
  console.log("🚀 Starting server...");

  // Allowed origins for CORS
  const allowedOrigins = ["https://sri-lab.vercel.app"];

  // CORS middleware
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("🚫 Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(express.json());

  // ✅ Initialize Gemini AI only once
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // Routes
  app.use("/api/bookings", bookingsRouter);

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Generate response using Gemini AI
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const response = await result.response;
      
      if (!response) {
        return res.status(500).json({ error: "Failed to generate response" });
      }

      res.json({ response: response.text() });
    } catch (error) {
      console.error("❌ Chat API Error:", error);
      res.status(500).json({ error: "Failed to process the request" });
    }
  });

  // Create HTTP server
  const server = http.createServer(app);

  // Initialize Socket.IO
  const io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("🚫 Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 A user connected");
    socket.on("disconnect", () => console.log("🔴 User disconnected"));
  });

  // Start the server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

  // Export server
  module.exports = server;
});
