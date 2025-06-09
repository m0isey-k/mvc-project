const express = require("express")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const config = require("./config")
const authRoutes = require("./routing/authRoutes")
const taskRoutes = require("./routing/taskRoutes")
const { initializeStore } = require("./store/dataStore")

const app = express()
const PORT = process.env.PORT || config.server.port

// Создаем папку для сессий
const sessionsDir = path.join(__dirname, "sessions")
if (!fs.existsSync(sessionsDir)) {
  fs.mkdirSync(sessionsDir, { recursive: true })
}

// EJS configuration
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

// Session configuration с файловым хранилищем
app.use(
  session({
    store: new FileStore({
      path: sessionsDir,
      ttl: 7 * 24 * 60 * 60, // 7 дней в секундах
      retries: 5,
      factor: 2,
      minTimeout: 50,
      maxTimeout: 100,
    }),
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    name: "household.sid",
    cookie: config.session.cookie,
  }),
)

// Middleware для детального логирования сессий и cookie
app.use((req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`\n[${timestamp}] ${req.method} ${req.url}`)

  // Логируем cookie
  console.log(`[Cookie] Received cookies:`, req.headers.cookie || "No cookies")

  // Логируем сессию
  console.log(`[Session] Session ID: ${req.sessionID || "No session ID"}`)
  console.log(`[Session] Session exists: ${!!req.session}`)

  if (req.session) {
    console.log(`[Session] User ID: ${req.session.userId || "Not set"}`)
    console.log(`[Session] Username: ${req.session.username || "Not set"}`)
    console.log(`[Session] Theme: ${req.session.theme || "Not set"}`)
  }

  next()
})

// Middleware для принудительного сохранения сессии
app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    req.session.lastActivity = new Date()

    // Принудительно сохраняем сессию
    req.session.save((err) => {
      if (err) {
        console.error("[Session] Save error:", err)
      } else {
        console.log(`[Session] ✅ Session saved for user ${req.session.username}`)
      }
    })
  }
  next()
})

// Initialize data store
console.log("Initializing data store...")
initializeStore()

// Routes
app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

// Home page
app.get("/", (req, res) => {
  console.log(`[Home] Session check - UserID: ${req.session?.userId}`)
  if (req.session && req.session.userId) {
    res.redirect("/tasks")
  } else {
    res.redirect("/auth/login")
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err)
  const theme = req.session?.theme || "light"
  res.status(500).render("error", {
    title: "Server Error",
    message: "An internal server error occurred",
    theme: theme,
  })
})

// 404 handler
app.use((req, res) => {
  const theme = req.session?.theme || "light"
  res.status(404).render("error", {
    title: "Page Not Found",
    message: "The page you are looking for does not exist",
    theme: theme,
  })
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully")
  process.exit(0)
})

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully")
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌐 Access the application at: http://localhost:${PORT}`)
  console.log(`📁 Sessions stored in: ${sessionsDir}`)
  console.log(`🔧 Session settings:`)
  console.log(`   - Store: FileStore`)
  console.log(`   - Max Age: ${config.session.cookie.maxAge / (1000 * 60 * 60 * 24)} days`)
  console.log(`   - Rolling: ${config.session.rolling}`)
  console.log(`   - Secure: ${config.session.cookie.secure}`)
})
