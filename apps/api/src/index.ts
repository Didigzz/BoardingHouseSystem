import dotenv from "dotenv";
import { app } from "./server";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🏠 Boarding House Management System - API Server   ║
║                                                       ║
║   Status: Running                                     ║
║   Port: ${PORT}                                        ║
║   Environment: ${process.env.NODE_ENV || "development"}                            ║
║                                                       ║
║   Endpoints:                                          ║
║   - Health: http://localhost:${PORT}/health            ║
║   - tRPC:   http://localhost:${PORT}/trpc              ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully...");
  process.exit(0);
});
