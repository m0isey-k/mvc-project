const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")
const path = require("path")
require("dotenv").config()

const config = require("./config")
const authRoutes = require("./routing/authRoutes")
const taskRoutes = require("./routing/taskRoutes")
const { initializeStore } = require("./store/dataStore")

const app = express()
const PORT = process.env.PORT || config.server.port

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    name: "household.sid",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      sameSite: "lax",
    },
  }),
)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    req.session.lastActivity = new Date()
  }
  next()
})

initializeStore()

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

app.get("/", (req, res) => {
  if (req.session && req.session.userId) {
    res.redirect("/tasks")
  } else {
    res.redirect("/auth/login")
  }
})

app.use((err, req, res, next) => {
  console.error("Error:", err)
  const theme = req.session?.theme || "light"
  res.status(500).render("error", {
    title: "Server Error",
    message: "An internal server error occurred",
    theme: theme,
  })
})

app.use((req, res) => {
  const theme = req.session?.theme || "light"
  res.status(404).render("error", {
    title: "Page Not Found",
    message: "The page you are looking for does not exist",
    theme: theme,
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Access: http://localhost:${PORT}`)
})
